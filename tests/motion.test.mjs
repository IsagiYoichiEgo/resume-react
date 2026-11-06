import test from 'node:test';
import assert from 'node:assert/strict';
import { scrollProgress, petPosition, canShowBubble, safePetPlacement } from '../src/lib/motion.ts';

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


test('the companion starts away from the desktop project button', () => {
  const p = safePetPlacement(0, 1265, 720, 122, 140, [{left:56,right:270,top:600,bottom:660}], false);
  assert.ok(p.x > 900);
  assert.equal(p.bottom, 9);
});

test('the companion moves above a full-width mobile action', () => {
  const p = safePetPlacement(.5,390,844,94,105,[{left:24,right:366,top:740,bottom:796}],false);
  assert.ok(844-p.bottom <= 730);
  assert.ok(p.x>=18 && p.x+94<=372);
});

test('reduced motion keeps the companion in one place while scrolling', () => {
  assert.deepEqual(safePetPlacement(0,390,844,94,105,[],true), safePetPlacement(1,390,844,94,105,[],true));
});
