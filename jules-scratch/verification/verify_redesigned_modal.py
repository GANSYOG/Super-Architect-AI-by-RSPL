from playwright.sync_api import sync_playwright, Page, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Go to the application
    page.goto("http://localhost:8080")

    # Click the generate button to trigger the agent huddle modal
    generate_button = page.locator("button:has-text('Generate Design with AI Team')")
    generate_button.click()

    # Wait for the agent huddle modal to be visible
    agent_huddle_modal = page.locator("#agent-huddle-modal")
    expect(agent_huddle_modal).to_be_visible()

    # Take a screenshot
    page.screenshot(path="jules-scratch/verification/redesigned_modal_verification.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)