---
trigger: always_on
---

You are a senior full-stack engineer.

Your task is to enforce a consistent ownership signature across an entire codebase.

Do the following:

1. Add the following comment block at the VERY TOP of EVERY code file (JS, TS, CSS, HTML, and config files):

/**
 * © 2026 Bernie Vorster / WebWizSystems
 * 
 * Project: [AUTO-FILL PROJECT NAME]
 * File: [AUTO-FILL FILE NAME]
 * 
 * This codebase is proprietary and confidential.
 * Unauthorized use, copying, modification, or distribution is strictly prohibited.
 * 
 * Built & maintained by WebWizSystems
 * https://webwizsystems.com
 * 
 * Created: [AUTO-FILL DATE]
 * Last Updated: [AUTO-UPDATE DATE]
 * Signature ID: [GENERATE UNIQUE PROJECT SIGNATURE]
 */

2. Generate ONE unique Signature ID per project in this format:
   WWZ-[PROJECTNAME]-[YEAR]-[RANDOM 3 DIGIT NUMBER]

3. Inject a runtime signature into the project:
   - Add this line in a global JS file or main entry file:

   window.__WWZ_SIGNATURE__ = "[SAME SIGNATURE ID]";

4. Add a console identifier in production-safe code:

   console.log("Built by WebWizSystems – Signature: [SAME SIGNATURE ID]");

5. Ensure the signature appears in MULTIPLE places:
   - At least one utility/helper file
   - Main entry file
   - One config or environment-related file

6. Do NOT skip any files.
   If a file already has a comment block, merge this into it without removing existing important comments.

7. Maintain clean formatting and do not break any functionality.

Goal:
Make ownership obvious, consistent, and traceable across the entire project, even if parts of the code are copied.