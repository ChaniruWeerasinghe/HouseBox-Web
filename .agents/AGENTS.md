# Project-Scoped Rules

## Committing Rule
Commit after each major step is done. However, if Antigravity makes changes and asks for clarifications, and the user (Chaniru) ignores the question and asks to do another step (meaning the previous work has no issues), then Antigravity can commit those previous changes before starting the new step.
Also u need to think, dont commit after each small step is done, we need at leats some stuff have done, otherwise no point right.

## UI Clone Workflow
When cloning UI from screenshots provided by Chaniru:
- Recreate the exact same design using HTML/CSS/JS.
- For every image in the screenshots, create an image folder corresponding to the page name.
- Instruct Chaniru exactly where to save each image and what name to give it (always include the file extension, e.g., `.png` or `.jpg`).
- Once Chaniru adds the images to the project, Antigravity must automatically convert all images to `.webp` format.

## Reusable Components
Before coding a new section (like a header, footer, or card), always check the project directory (especially the `components/` folder) to see if a reusable component already exists. Do not write duplicate code if a component can be reused or updated.

## Manual File Editing and No Commands/Scripts
Do NOT use terminal commands, bash scripts, or python scripts (like `run_command` with Python or PowerShell) for tasks like viewing files, searching content, or making text replacements in files. You MUST use the built-in manual file editing tools (e.g., `view_file`, `replace_file_content`, `multi_replace_file_content`) to do the work. You are not allowed to use other languages for easy work.
