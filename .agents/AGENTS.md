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

## True Transparent Wipe Animation (Left-to-Right Image Reveal)
When Chaniru asks for an image to load or reveal from left-to-right (and explicitly requests no solid background block, or if the container has rounded corners that must be preserved during animation), use the "True Transparent Wipe" method using CSS `mask-image`.
DO NOT use `clip-path` as it breaks `border-radius` during transitions on Webkit browsers.
DO NOT use a pseudo-element (`::after`) with a solid background color if a transparent wipe is required.

**Implementation (in CSS):**
```css
.clip-left-to-right {
    -webkit-mask-image: linear-gradient(to right, black 50%, transparent 50%);
    mask-image: linear-gradient(to right, black 50%, transparent 50%);
    -webkit-mask-size: 200% 100%;
    mask-size: 200% 100%;
    -webkit-mask-position: 100% 0;
    mask-position: 100% 0;
    transition: -webkit-mask-position 1.2s cubic-bezier(0.2, 1, 0.3, 1), mask-position 1.2s cubic-bezier(0.2, 1, 0.3, 1);
}
.clip-left-to-right.is-revealed {
    -webkit-mask-position: 0 0;
    mask-position: 0 0;
}
```
*Note: Make sure to add `.clip-left-to-right` to the `IntersectionObserver` trigger list in `js/script.js` so that the `.is-revealed` class gets applied when the element scrolls into view.*
