export interface TableOfContent {
    id: number;
    title: string;
  }
  
  export interface Resource {
    id: number;
    title: string;
    type: 'youtube' | 'blog';
    url: string;
  }
  
  export interface Content {
    id: number;
    content: string;
  }