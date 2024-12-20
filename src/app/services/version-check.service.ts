import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VersionCheckService {
  private currentVersion = '1.0.0';

  constructor(private http: HttpClient) {
  }

  /**
   * Vérifie périodiquement la version du fichier version.json
   */
  checkVersion(url: string, intervalMs: number = 60000): void {
    interval(intervalMs)
      .pipe(
        startWith(0), // Exécute immédiatement la première requête
        switchMap(() => this.getVersion(url))
      )
      .subscribe((latestVersion) => {
        if (this.currentVersion && this.currentVersion !== latestVersion) {
          this.promptUserToReload();
        }
        this.currentVersion = latestVersion;
      });
  }

  /**
   * Récupère la version depuis le fichier version.json
   */
  private getVersion(url: string): Observable<string> {
    return this.http.get<{ version: string }>(url).pipe(map((data) => data.version));
  }

  /**
   * Affiche une notification pour recharger l'application
   */
  private promptUserToReload(): void {
    if (confirm('Une nouvelle version de l\'application est disponible. Recharger ?')) {
      window.location.reload();
    }
  }
}
