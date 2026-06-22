import { Component, signal, OnInit, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);
  protected readonly title = signal('UPCianos');
  protected readonly isDark = signal(true);

  constructor() {
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        document.documentElement.setAttribute('data-theme', this.isDark() ? 'dark' : 'light');
      }
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('theme');
      this.isDark.set(saved ? saved === 'dark' : true);
    }
  }

  protected toggleTheme(): void {
    this.isDark.update(v => !v);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', this.isDark() ? 'dark' : 'light');
    }
  }
}
