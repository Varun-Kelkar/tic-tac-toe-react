import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('Tic Tac Toe Game', () => {
  test('should display the game title', async ({ page }) => {
    await expect(page.locator('.game-title')).toHaveText('Tic Tac Toe');
  });

  test('should show X turn initially', async ({ page }) => {
    const turnIndicator = page.locator('.turn-indicator');
    await expect(turnIndicator).toContainText("X");
    await expect(turnIndicator).toContainText("turn");
  });

  test('should place X on first click', async ({ page }) => {
    const firstCell = page.locator('.grid-item').first();
    await firstCell.click();
    await expect(firstCell).toHaveText('X');
  });

  test('should alternate between X and O', async ({ page }) => {
    const cells = page.locator('.grid-item');
    await cells.nth(0).click();
    await expect(cells.nth(0)).toHaveText('X');

    await cells.nth(1).click();
    await expect(cells.nth(1)).toHaveText('O');

    await cells.nth(2).click();
    await expect(cells.nth(2)).toHaveText('X');
  });

  test('should update turn indicator after each move', async ({ page }) => {
    const turnIndicator = page.locator('.turn-indicator');
    await expect(turnIndicator).toContainText("X");

    await page.locator('.grid-item').first().click();
    await expect(turnIndicator).toContainText("O");
  });

  test('should detect a winner on a row', async ({ page }) => {
    const cells = page.locator('.grid-item');

    // X plays row 0: (0,0), (0,1), (0,2), (0,3), (0,4)
    // O plays row 1: (1,0), (1,1), (1,2), (1,3)
    await cells.nth(0).click();  // X at (0,0)
    await cells.nth(5).click();  // O at (1,0)
    await cells.nth(1).click();  // X at (0,1)
    await cells.nth(6).click();  // O at (1,1)
    await cells.nth(2).click();  // X at (0,2)
    await cells.nth(7).click();  // O at (1,2)
    await cells.nth(3).click();  // X at (0,3)
    await cells.nth(8).click();  // O at (1,3)
    await cells.nth(4).click();  // X at (0,4) — X wins row 0

    await expect(page.locator('.winner-banner')).toHaveText('Player One Wins!');
  });

  test('should detect a winner on a column', async ({ page }) => {
    const cells = page.locator('.grid-item');

    // X plays column 0: (0,0), (1,0), (2,0), (3,0), (4,0)
    // O plays column 1: (0,1), (1,1), (2,1), (3,1)
    await cells.nth(0).click();   // X at (0,0)
    await cells.nth(1).click();   // O at (0,1)
    await cells.nth(5).click();   // X at (1,0)
    await cells.nth(6).click();   // O at (1,1)
    await cells.nth(10).click();  // X at (2,0)
    await cells.nth(11).click();  // O at (2,1)
    await cells.nth(15).click();  // X at (3,0)
    await cells.nth(16).click();  // O at (3,1)
    await cells.nth(20).click();  // X at (4,0) — X wins column 0

    await expect(page.locator('.winner-banner')).toHaveText('Player One Wins!');
  });

  test('should detect a winner on the main diagonal', async ({ page }) => {
    const cells = page.locator('.grid-item');

    // X plays diagonal: (0,0), (1,1), (2,2), (3,3), (4,4)
    // O plays: (0,1), (1,0), (0,2), (1,2)
    await cells.nth(0).click();   // X at (0,0)
    await cells.nth(1).click();   // O at (0,1)
    await cells.nth(6).click();   // X at (1,1)
    await cells.nth(5).click();   // O at (1,0)
    await cells.nth(12).click();  // X at (2,2)
    await cells.nth(2).click();   // O at (0,2)
    await cells.nth(18).click();  // X at (3,3)
    await cells.nth(7).click();   // O at (1,2)
    await cells.nth(24).click();  // X at (4,4) — X wins diagonal

    await expect(page.locator('.winner-banner')).toHaveText('Player One Wins!');
  });

  test('should detect a winner on the anti diagonal', async ({ page }) => {
    const cells = page.locator('.grid-item');

    // X plays anti-diagonal: (0,4), (1,3), (2,2), (3,1), (4,0)
    // O plays: (0,0), (0,1), (0,2), (0,3)
    await cells.nth(4).click();   // X at (0,4)
    await cells.nth(0).click();   // O at (0,0)
    await cells.nth(8).click();   // X at (1,3)
    await cells.nth(1).click();   // O at (0,1)
    await cells.nth(12).click();  // X at (2,2)
    await cells.nth(2).click();   // O at (0,2)
    await cells.nth(16).click();  // X at (3,1)
    await cells.nth(3).click();   // O at (0,3)
    await cells.nth(20).click();  // X at (4,0) — X wins anti-diagonal

    await expect(page.locator('.winner-banner')).toHaveText('Player One Wins!');
  });

  test('should show draw message when declaring draw', async ({ page }) => {
    await page.locator('.draw-btn').click();
    await expect(page.locator('.winner-banner')).toHaveText("It's a Draw!");
  });

  test('should show Play Again button after game ends', async ({ page }) => {
    await page.locator('.draw-btn').click();
    await expect(page.locator('.restart-btn')).toHaveText('Play Again');
  });

  test('should reset the game when Play Again is clicked', async ({ page }) => {
    const cells = page.locator('.grid-item');

    // Make a move, then declare draw, then reset
    await cells.nth(0).click();
    await page.locator('.draw-btn').click();
    await page.locator('.restart-btn').click();

    // Board should be empty
    for (let i = 0; i < 25; i++) {
      await expect(cells.nth(i)).toHaveText('');
    }

    // Turn indicator should show X's turn again
    await expect(page.locator('.turn-indicator')).toContainText("X");
  });

  test('should have 25 cells for a 5x5 board', async ({ page }) => {
    const cells = page.locator('.grid-item');
    await expect(cells).toHaveCount(25);
  });
});
