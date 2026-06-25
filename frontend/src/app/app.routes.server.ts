import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
<<<<<<< Updated upstream
    renderMode: RenderMode.Prerender,
  },
=======
    renderMode: RenderMode.Server
  }
>>>>>>> Stashed changes
];
