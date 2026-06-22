import { Component, OnInit, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

interface Career {
  id: string;
  name: string;
}

interface Subject {
  id: string;
  name: string;
  yearOfCareer: number;
}

interface FileMetadata {
  _id: string;
  title: string;
  description?: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  subjectId: string;
  userId: string;
  tags: string[];
  downloads: number;
  likes: string[];
  createdAt: string;
}

interface UserComment {
  _id: string;
  fileId: string;
  userId: string;
  userFullName: string;
  content: string;
  createdAt: string;
}

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.css',
})
export class ExploreComponent implements OnInit {
  private http = inject(HttpClient);
  authService = inject(AuthService);

  // — Estado de navegación —
  activeView = signal<'explore' | 'detail'>('explore');
  menuOpen = signal<boolean>(false);

  // — Carreras y materias —
  careers = signal<Career[]>([]);
  selectedCareerId = signal<string | null>(null);
  subjects = signal<Subject[]>([]);
  selectedSubjectId = signal<string | null>(null);

  // — Archivos —
  files = signal<FileMetadata[]>([]);

  // — Vista de detalle —
  selectedFileForDetail = signal<FileMetadata | null>(null);
  isEditMode = signal<boolean>(false);
  editTitle = signal<string>('');
  editDesc = signal<string>('');
  editTags = signal<string>('');

  // — Visor de PDF —
  currentPdfPage = signal<number>(1);
  pdfPageLimitReached = signal<boolean>(false);
  showPageLimitWarning = signal<boolean>(false);

  // — Comentarios —
  selectedFileForComments = signal<FileMetadata | null>(null);
  comments = signal<UserComment[]>([]);

  // — Modal de subida —
  isUploadModalOpen = signal<boolean>(false);
  selectedFileToUpload = signal<File | null>(null);
  isUploading = signal<boolean>(false);
  uploadError = signal<string | null>(null);
  uploadSuccess = signal<string | null>(null);
  uploadTitle = signal<string>('');
  uploadDescription = signal<string>('');
  uploadTags = signal<string>('');

  // ─── Lifecycle ──────────────────────────────────────────────────────────────

  ngOnInit(): void {
    this.loadCareers();
  }

  // ─── Carga de datos ─────────────────────────────────────────────────────────

  loadCareers(): void {
    this.http.get<{ status: string; data: { careers: Career[] } }>('/api/careers').subscribe({
      next: (res) => this.careers.set(res.data.careers),
      error: (err: unknown) => console.error('Error al cargar carreras:', err),
    });
  }

  selectCareer(careerId: string): void {
    this.selectedCareerId.set(careerId);
    this.selectedSubjectId.set(null);
    this.files.set([]);

    this.http
      .get<{ status: string; data: { subjects: Subject[] } }>(`/api/careers/${careerId}/subjects`)
      .subscribe({
        next: (res) => this.subjects.set(res.data.subjects),
        error: (err: unknown) => console.error('Error al cargar materias:', err),
      });
  }

  selectSubject(subjectId: string): void {
    this.selectedSubjectId.set(subjectId);
    this.loadFilesOfSubject(subjectId);
  }

  loadFilesOfSubject(subjectId: string): void {
    this.http
      .get<{ status: string; data: { files: FileMetadata[] } }>(`/api/files/subject/${subjectId}`)
      .subscribe({
        next: (res) => this.files.set(res.data.files),
        error: (err: unknown) => console.error('Error al cargar archivos:', err),
      });
  }

  // ─── Helpers de materias ────────────────────────────────────────────────────

  hasSubjectsOfYear(year: number): boolean {
    return this.subjects().some((s: Subject) => s.yearOfCareer === year);
  }

  getSubjectsOfYear(year: number): Subject[] {
    return this.subjects().filter((s: Subject) => s.yearOfCareer === year);
  }

  getSelectedSubjectName(): string {
    const activeSubjId = this.selectedSubjectId();
    if (!activeSubjId) return 'Selecciona primero una materia académica en la barra lateral.';
    const found = this.subjects().find((s: Subject) => s.id === activeSubjId);
    return found ? found.name : 'Materia Académica';
  }

  // ─── Vista de detalle ────────────────────────────────────────────────────────

  viewFileDetail(file: FileMetadata): void {
    this.selectedFileForDetail.set(file);
    this.activeView.set('detail');
    this.isEditMode.set(false);
    this.currentPdfPage.set(1);
    this.pdfPageLimitReached.set(false);
    this.showPageLimitWarning.set(false);

    this.http
      .get<{ status: string; data: { comments: UserComment[] } }>(`/api/comments/file/${file._id}`)
      .subscribe({
        next: (res) => this.comments.set(res.data.comments),
        error: (err: unknown) => console.error('Error al cargar comentarios:', err),
      });
  }

  closeFileDetail(): void {
    this.activeView.set('explore');
    this.selectedFileForDetail.set(null);
    this.comments.set([]);
    this.isEditMode.set(false);
  }

  // ─── Edición de metadatos ───────────────────────────────────────────────────

  isFileOwner(): boolean {
    const file = this.selectedFileForDetail();
    const currentUser = this.authService.currentUser();
    return !!(file && currentUser && file.userId === currentUser.id);
  }

  enableEditMode(): void {
    const file = this.selectedFileForDetail();
    if (file) {
      this.editTitle.set(file.title);
      this.editDesc.set(file.description || '');
      this.editTags.set(file.tags.join(', '));
    }
    this.isEditMode.set(true);
  }

  disableEditMode(): void {
    this.isEditMode.set(false);
  }

  saveChanges(): void {
    const file = this.selectedFileForDetail();
    const updatedTitle = this.editTitle();
    const updatedDesc = this.editDesc();
    const updatedTags = this.editTags();

    if (!file || !updatedTitle.trim()) return;

    this.http
      .put<{ status: string; data: { file: FileMetadata } }>(`/api/files/${file._id}`, {
        title: updatedTitle.trim(),
        description: updatedDesc.trim(),
        tags: updatedTags,
      })
      .subscribe({
        next: (res) => {
          const newMetadata = res.data.file;
          this.selectedFileForDetail.set(newMetadata);
          this.files.update((all: FileMetadata[]) =>
            all.map((f: FileMetadata) => (f._id === newMetadata._id ? newMetadata : f))
          );
          this.isEditMode.set(false);
        },
        error: (err: unknown) => console.error('Error al guardar cambios:', err),
      });
  }

  deleteFile(fileId: string): void {
    this.http.delete<any>(`/api/files/${fileId}`).subscribe({
      next: () => {
        this.files.update((all: FileMetadata[]) =>
          all.filter((f: FileMetadata) => f._id !== fileId)
        );
        this.closeFileDetail();
      },
      error: (err: unknown) => console.error('Error al eliminar archivo:', err),
    });
  }

  // ─── Visor de PDF ────────────────────────────────────────────────────────────

  getPdfPageUrl(pageNumber: number): string {
    const file = this.selectedFileForDetail();
    if (!file) return '';

    let rawUrl = file.fileUrl.startsWith('http://')
      ? file.fileUrl.replace('http://', 'https://')
      : file.fileUrl;

    rawUrl = rawUrl.replace(/\.pdf$/i, '.png');

    if (rawUrl.includes('/upload/')) {
      rawUrl = rawUrl.replace('/upload/', `/upload/pg_${pageNumber},w_1000,f_auto,q_auto/`);
    }

    return rawUrl;
  }

  getCleanImageUrl(): string {
    const file = this.selectedFileForDetail();
    if (!file) return '';
    return file.fileUrl.startsWith('http://')
      ? file.fileUrl.replace('http://', 'https://')
      : file.fileUrl;
  }

  prevPdfPage(): void {
    if (this.currentPdfPage() > 1) {
      this.currentPdfPage.update((p) => p - 1);
      this.pdfPageLimitReached.set(false);
      this.showPageLimitWarning.set(false);
    }
  }

  nextPdfPage(): void {
    if (!this.pdfPageLimitReached()) {
      this.currentPdfPage.update((p) => p + 1);
    }
  }

  onPdfPageError(): void {
    if (this.currentPdfPage() > 1) {
      this.pdfPageLimitReached.set(true);
      this.currentPdfPage.update((p) => p - 1);
      this.showPageLimitWarning.set(true);
      setTimeout(() => this.showPageLimitWarning.set(false), 2500);
    }
  }

  // ─── Descarga y likes ────────────────────────────────────────────────────────

  download(file: FileMetadata): void {
    this.http
      .get<{ status: string; data: { fileUrl: string } }>(`/api/files/${file._id}/download`)
      .subscribe({
        next: (res) => {
          this.files.update((allFiles: FileMetadata[]) =>
            allFiles.map((f: FileMetadata) =>
              f._id === file._id ? { ...f, downloads: f.downloads + 1 } : f
            )
          );

          const currentDetail = this.selectedFileForDetail();
          if (currentDetail?._id === file._id) {
            this.selectedFileForDetail.set({
              ...currentDetail,
              downloads: currentDetail.downloads + 1,
            });
          }

          window.open(res.data.fileUrl, '_blank');
        },
        error: (err: unknown) => console.error('Error al registrar la descarga:', err),
      });
  }

  toggleLike(file: FileMetadata): void {
    if (!this.authService.isAuthenticated()) {
      alert('Debes iniciar sesión para dar me gusta.');
      return;
    }

    this.http.post<any>(`/api/files/${file._id}/like`, {}).subscribe({
      next: () => {
        const userId = this.authService.currentUser()?.id;
        if (!userId) return;

        const updateLikes = (likesList: string[]) => {
          const idx = likesList.indexOf(userId);
          return idx === -1
            ? [...likesList, userId]
            : likesList.filter((id) => id !== userId);
        };

        this.files.update((allFiles: FileMetadata[]) =>
          allFiles.map((f: FileMetadata) =>
            f._id === file._id ? { ...f, likes: updateLikes(f.likes) } : f
          )
        );

        const currentDetail = this.selectedFileForDetail();
        if (currentDetail?._id === file._id) {
          this.selectedFileForDetail.set({
            ...currentDetail,
            likes: updateLikes(currentDetail.likes),
          });
        }
      },
      error: (err: unknown) => console.error('Error al actualizar like:', err),
    });
  }

  hasUserLiked(file: FileMetadata): boolean {
    const userId = this.authService.currentUser()?.id;
    return userId ? file.likes.includes(userId) : false;
  }

  // ─── Comentarios ─────────────────────────────────────────────────────────────

  openComments(file: FileMetadata): void {
    this.selectedFileForComments.set(file);
    this.http
      .get<{ status: string; data: { comments: UserComment[] } }>(`/api/comments/file/${file._id}`)
      .subscribe({
        next: (res) => this.comments.set(res.data.comments),
        error: (err: unknown) => console.error('Error al cargar comentarios:', err),
      });
  }

  closeComments(): void {
    this.selectedFileForComments.set(null);
    this.comments.set([]);
  }

  submitComment(content: string): void {
    const file = this.selectedFileForDetail() || this.selectedFileForComments();
    if (!content.trim() || !file) return;

    this.http
      .post<{ status: string; data: { comment: UserComment } }>(
        `/api/comments/file/${file._id}`,
        { content: content.trim() }
      )
      .subscribe({
        next: (res) =>
          this.comments.update((all: UserComment[]) => [...all, res.data.comment]),
        error: (err: unknown) => console.error('Error al publicar comentario:', err),
      });
  }

  canDeleteComment(comment: UserComment): boolean {
    return this.authService.currentUser()?.id === comment.userId;
  }

  deleteComment(commentId: string): void {
    this.http.delete<any>(`/api/comments/${commentId}`).subscribe({
      next: () =>
        this.comments.update((all: UserComment[]) =>
          all.filter((c: UserComment) => c._id !== commentId)
        ),
      error: (err: unknown) => console.error('Error al borrar comentario:', err),
    });
  }

  // ─── Modal de subida ─────────────────────────────────────────────────────────

  openUploadModal(): void {
    if (!this.selectedSubjectId()) {
      alert('Por favor, selecciona primero una asignatura en la barra lateral antes de subir un documento.');
      return;
    }
    this.isUploadModalOpen.set(true);
    this.selectedFileToUpload.set(null);
    this.uploadError.set(null);
    this.uploadSuccess.set(null);
    this.isUploading.set(false);
    this.uploadTitle.set('');
    this.uploadDescription.set('');
    this.uploadTags.set('');
  }

  closeUploadModal(): void {
    this.isUploadModalOpen.set(false);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFileToUpload.set(file);
      if (!this.uploadTitle().trim()) {
        this.uploadTitle.set(this._stripExtension(file.name));
      }
    }
  }

  onFileDropped(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      this.selectedFileToUpload.set(file);
      if (!this.uploadTitle().trim()) {
        this.uploadTitle.set(this._stripExtension(file.name));
      }
    }
  }

  submitFileUpload(): void {
    const file = this.selectedFileToUpload();
    const subjectId = this.selectedSubjectId();
    const title = this.uploadTitle();
    const description = this.uploadDescription();
    const tagsRaw = this.uploadTags();

    if (!file || !title.trim() || !subjectId) {
      this.uploadError.set('Por favor, completa todos los campos obligatorios y selecciona un archivo válido.');
      return;
    }

    this.isUploading.set(true);
    this.uploadError.set(null);
    this.uploadSuccess.set(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title.trim());
    formData.append('description', description.trim());
    formData.append('subjectId', subjectId);
    if (tagsRaw.trim()) formData.append('tags', tagsRaw.trim());

    this.http
      .post<{ status: string; message: string }>('/api/files/upload', formData)
      .subscribe({
        next: () => {
          this.isUploading.set(false);
          this.uploadSuccess.set('¡Documento cargado con éxito en la nube de Cloudinary!');
          this.loadFilesOfSubject(subjectId);
          setTimeout(() => this.closeUploadModal(), 1500);
        },
        error: (err: any) => {
          this.isUploading.set(false);
          this.uploadError.set(
            err?.error?.message || 'Hubo un error al procesar la subida del archivo.'
          );
        },
      });
  }

  // ─── Helpers de formato ──────────────────────────────────────────────────────

  getFileExtension(mimeType: string): string {
    if (mimeType.includes('pdf')) return 'PDF';
    if (mimeType.includes('word') || mimeType.includes('document')) return 'DOCX';
    if (mimeType.includes('zip')) return 'ZIP';
    if (mimeType.includes('image')) return 'IMAGEN';
    return 'DOC';
  }

  formatBytes(bytes: number, decimals = 2): string {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('es-AR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }

  // ─── Privados ────────────────────────────────────────────────────────────────

  private _stripExtension(filename: string): string {
    const lastDot = filename.lastIndexOf('.');
    return lastDot !== -1 ? filename.substring(0, lastDot) : filename;
  }
}