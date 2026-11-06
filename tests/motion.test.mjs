import test from 'node:test';
import assert from 'node:assert/strict';
import { scrollProgress, petPosition, canShowBubble } from '../src/lib/motion.ts';

test('scroll progress reaches the end of the readable page', () => {
  assert.equal(scrollProgress(600, 2000, 800), 0.5);
  assert.equal(scrollProgress(1200, 2000, 800), 1);
});

test('short pages and browser overscroll never produce invalid progress', () => {
  assert.equal(scrollProgress(0, 600, 800), 0);
  assert.equal(scrollProgress(-80, 2000, 800), 0);
  assert.equal(scrollProgress(1600, 2000, 800), 1);
  assert.equal(scrollProgress(Number.NaN, 2000, 800), 0);
});

test('the cat stays inside a mobile viewport at both ends of the page', () => {
  assert.equal(petPosition(0, 390, 112, 18), 18);
  assert.equal(petPosition(1, 390, 112, 18), 260);
  assert.equal(petPosition(0.5, 390, 112, 18), 139);
  assert.equal(petPosition(2, 390, 112, 18), 260);
  assert.equal(petPosition(-1, 390, 112, 18), 18);
});

test('resizing to a narrow viewport cannot send the cat to negative coordinates', () => {
  assert.equal(petPosition(1, 80, 112, 18), 0);
  assert.equal(petPosition(1, 1440, 128, 24), 1288);
});

test('context messages wait and do not repeat for the same section', () => {
  assert.equal(canShowBubble(5000, 0, 'home', 'projects'), false);
  assert.equal(canShowBubble(6000, 0, 'home', 'projects'), true);
  assert.equal(canShowBubble(12000, 0, 'projects', 'projects'), false);
  assert.equal(canShowBubble(12000, 0, 'home', ''), false);
  assert.equal(canShowBubble(100, 1000, 'home', 'projects'), false);
});
