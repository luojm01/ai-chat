export interface GithubProfile {
  id: string;
  username: string;
  displayName: string;
  photos: Array<{ value: string }>;
  _json?: {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
  };
}
