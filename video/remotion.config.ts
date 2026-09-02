import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
// Software GL rendering is the reliable choice on a headless server without a GPU.
Config.setChromiumOpenGlRenderer("swangle");
// The agent proxy performs TLS interception with a custom CA that headless
// Chrome does not trust; allow font fetches from fonts.gstatic.com to succeed.
Config.setChromiumIgnoreCertificateErrors(true);
