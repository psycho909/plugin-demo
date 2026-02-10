// deps.js
// 這裡負責從 CDN 引入並重新匯出 (Re-export) 我們需要的功能
import { h, render } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import htm from 'htm';

// 初始化 htm
const html = htm.bind(h);

// 匯出給其他組件使用
export { h, render, useState, useEffect, html };