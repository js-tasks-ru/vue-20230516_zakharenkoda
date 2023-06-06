import fs from 'node:fs/promises';
import path from 'node:path';

describe('sfc/UiTransitionGroupFade', () => {
  describe('UiTransitionGroupFade', () => {
    it('Исходный код UiTransitionGroupFade должен иметь <style scoped>', async () => {
      const solutionText = await fs.readFile(
        path.join(__dirname, global.getSolutionPath('components/UiTransitionGroupFade.vue')),
        'utf8',
      );
      expect(solutionText).toMatch(/<style\s+scoped>/m);
      expect(solutionText).not.toMatch(/<style>/m);
    });
  });
});
