#!/usr/bin/env python3
"""Synthesize a subtle, restrained ambient bed for the Avant Garde brand video.

Dark A-minor drone: sub, triad, and a faint high 'air' layer, with slight
detune for organic movement and a very slow amplitude swell. All processing
(warm low-pass, gentle space, long fades, normalization) is done here in numpy
because the available ffmpeg builds lack the audio filters; ffmpeg only encodes.
"""
import wave
import numpy as np

SR = 44100
DURATION = 130.0  # generous; trimmed to final length in the composition
t = np.linspace(0, DURATION, int(SR * DURATION), endpoint=False)

# A-minor drone. (freq, amplitude) — A1 sub through a soft high octave.
partials = [
    (55.00, 0.55),   # A1 sub
    (110.00, 0.26),  # A2
    (110.25, 0.20),  # A2 detuned -> slow beating
    (130.81, 0.15),  # C3 (minor third)
    (164.81, 0.17),  # E3 (fifth)
    (220.00, 0.09),  # A3
    (329.63, 0.035), # E4 air
]

# Slow amplitude swell (~0.09 Hz, ~11s cycle) for gentle motion.
swell = 0.78 + 0.22 * np.sin(2 * np.pi * 0.09 * t)


def build(detune, phase_off):
    sig = np.zeros_like(t)
    for i, (f, a) in enumerate(partials):
        sig += a * np.sin(2 * np.pi * f * detune * t + phase_off + i * 0.3)
    return sig * swell


left = build(1.0000, 0.0)
right = build(1.0007, 0.9)  # tiny detune + phase -> natural stereo width


def smooth_lowpass(x, cutoff):
    """Warm one-pole low-pass (exponential moving average) to soften the tone."""
    rc = 1.0 / (2 * np.pi * cutoff)
    dt = 1.0 / SR
    alpha = dt / (rc + dt)
    one_minus = 1.0 - alpha
    y = np.empty_like(x)
    acc = 0.0
    for n in range(x.size):
        acc = acc * one_minus + alpha * x[n]
        y[n] = acc
    return y


left = smooth_lowpass(left, 1150.0)
right = smooth_lowpass(right, 1150.0)

# Fades: smooth (cosine) fade in 5s, fade out 6s.
fade_in = int(5.0 * SR)
fade_out = int(6.0 * SR)
env = np.ones_like(t)
env[:fade_in] = 0.5 - 0.5 * np.cos(np.linspace(0, np.pi, fade_in))
env[-fade_out:] = 0.5 + 0.5 * np.cos(np.linspace(0, np.pi, fade_out))
left *= env
right *= env

# Normalize to a calm peak so there is ample headroom under the voice.
peak = max(np.max(np.abs(left)), np.max(np.abs(right)))
target = 0.42
left = left / peak * target
right = right / peak * target

pcm = np.stack([left, right], axis=1)
pcm16 = (np.clip(pcm, -1.0, 1.0) * 32767).astype("<i2")

with wave.open("public/ambient-bed-raw.wav", "w") as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(pcm16.tobytes())

print("wrote public/ambient-bed-raw.wav", DURATION, "s")
