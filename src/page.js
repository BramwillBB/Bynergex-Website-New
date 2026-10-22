// Service pages: shared behaviour plus reveals and the load profile. No film, no WebGL.
import { reveal, drawLoadProfile } from "./common.js";
import "./engage.js";

reveal([".page-hero__copy > *", ".prose > *", ".losses li", ".energy__steps > li", ".energy__gains > div", ".deliver li",
  ".sseg__steps > div", ".stage__body", ".faq > h2", ".faq details", ".contact__head > *", ".enquiry", ".related a"].join(","));
drawLoadProfile();
