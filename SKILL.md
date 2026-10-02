# Spin Wheel Skill for Gift Genie

## Purpose
Use this skill when you need to add, fix, or validate the spin-wheel experience in the Gift Genie app. The goal is to make the wheel feel polished, deterministic enough to test, and aligned with the product’s playful gift-discovery UX.

## When to use this skill
- The home screen needs a working lucky-spins interaction
- The wheel logic needs debugging or tuning
- A new prize set, labels, or visual styling is required
- A user asks for the app to be opened and checked in the browser

## Workflow

### 1) Inspect the current implementation
Start in the home page and identify the wheel state and interaction handlers:
- Review the wheel configuration array and prize labels
- Confirm the animation state: idle vs spinning
- Check whether a random prize is selected and mapped to the rotation angle correctly

Relevant files:
- `src/pages/HomePage.tsx`
- `src/index.css` for wheel styling and animation classes

### 2) Validate the feature intent
Before changing code, decide what the experience should do:
- Should the wheel spin for a random prize?
- Should the pointer align to a target segment?
- Should the result show beneath the wheel after the animation finishes?
- Should there be a skip button or surprise flow?

If the requirement is unclear, ask for the expected behavior rather than guessing.

### 3) Implement the root fix
When updating the wheel:
- Keep the prize list in a single source of truth
- Compute the segment angle from the number of items
- Add rotation based on the current angle and a fixed number of spins
- Set an `isSpinning` guard to prevent repeated clicks
- Reset the result before the spin and show it after the animation completes
- Keep colors, labels, and pointer alignment readable and accessible

### 4) Verify the visual behavior
After the code change:
- Run the app locally
- Open the homepage
- Click the wheel button and confirm the wheel rotates
- Confirm the result appears after the animation ends
- Check that repeated clicks are ignored while spinning
- Ensure the layout remains responsive on small screens

### 5) Final quality checks
Use this checklist before closing the task:
- The wheel spins without jitter or locking
- Prize selection is random but visually consistent with the target segment
- The result text is understandable and on-brand
- Styling still matches the app theme and accessibility expectations
- The app compiles without TypeScript or Vite errors

## Decision points
- If the wheel is visually misaligned, inspect the `segmentAngle` math and pointer position
- If the wheel does not spin, check the `isSpinning` guard and state update timing
- If the result is wrong, verify the prize index calculation and rotation formula
- If the app won’t start, confirm dependencies are installed and the local dev server script is correct

## Completion criteria
Consider the task complete only when:
1. The spin-wheel behavior works in the browser
2. The UI matches the intended gift-genie theme
3. The app loads successfully via the local dev server
4. The user can interact with the homepage without obvious visual or logic errors

## Quick command set
```bash
npm install
npm run dev -- --host 0.0.0.0
```

Then open the app in a browser at:
```text
http://localhost:5173
```

## Example prompts
- “Fix the spin wheel so it lands on a random gift and shows the result after spinning.”
- “Make the magic wheel visually aligned and responsive on mobile.”
- “Open the app and verify the homepage spin-wheel behavior.”
- “Add a better prize list and ensure the wheel animation is smooth.”

## Related customizations to create next
- A skill for “gift finder questionnaire workflow”
- A skill for “debugging React state and animation issues”
- A skill for “launching and verifying frontend apps in a local workspace”
