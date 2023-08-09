/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    pages: Page;
    studies: Study;
    media: Media;
    'form-submissions': FormSubmission;
    categories: Category;
    users: User;
  };
  globals: {
    'mega-menu': MegaMenu;
    'social-media': SocialMedia;
    footer: Footer;
    site: Site;
  };
}
export interface Page {
  id: string;
  title: string;
  heroType: 'minimal' | 'contentAboveImage' | 'contentLeftOfImage';
  heroContent: {
    [k: string]: unknown;
  }[];
  heroImage: string | Media;
  layout: (
    | {
        ctaFields: {
          backgroundColor?: 'none' | 'red' | 'blue' | 'orange';
          content: {
            [k: string]: unknown;
          }[];
          feature: 'none' | 'cpa';
          links?: {
            link: {
              type?: 'reference' | 'custom';
              newTab?: boolean;
              reference: {
                value: string | Page;
                relationTo: 'pages';
              };
              url: string;
              label: string;
            };
            id?: string;
          }[];
        };
        id?: string;
        blockName?: string;
        blockType: 'cta';
      }
    | {
        backgroundColor?: 'none' | 'red' | 'blue' | 'orange';
        columns?: {
          width: 'oneThird' | 'half' | 'twoThirds' | 'full';
          alignment: 'left' | 'center' | 'right';
          content: {
            [k: string]: unknown;
          }[];
          id?: string;
        }[];
        accentLine?: boolean;
        accentLineAlignment?: 'left' | 'right';
        paddingTop?: 'none' | 'small' | 'medium' | 'large';
        paddingBottom?: 'none' | 'small' | 'medium' | 'large';
        id?: string;
        blockName?: string;
        blockType: 'content';
      }
    | {
        actions?: {
          headline: string;
          link: {
            type?: 'reference' | 'custom';
            newTab?: boolean;
            reference: {
              value: string | Page;
              relationTo: 'pages';
            };
            url: string;
            label: string;
            appearance?: 'default' | 'primary' | 'secondary';
          };
          id?: string;
        }[];
        id?: string;
        blockName?: string;
        blockType: 'cta-grid';
      }
    | {
        image: string | Media;
        type: 'card' | 'feature';
        caption?: {
          [k: string]: unknown;
        }[];
        id?: string;
        blockName?: string;
        blockType: 'image';
      }
    | {
        images?: {
          image: string | Media;
          id?: string;
        }[];
        id?: string;
        blockName?: string;
        blockType: 'image-collage';
      }
    | {
        backgroundColor?: 'none' | 'red' | 'blue' | 'orange';
        content: {
          [k: string]: unknown;
        }[];
        enableCTA?: boolean;
        link?: {
          type?: 'reference' | 'custom';
          newTab?: boolean;
          reference: {
            value: string | Page;
            relationTo: 'pages';
          };
          url: string;
          label: string;
          appearance?: 'default' | 'primary' | 'secondary';
        };
        images?: {
          image: string | Media;
          id?: string;
        }[];
        id?: string;
        blockName?: string;
        blockType: 'image-content-collage';
      }
    | {
        backgroundColor?: 'none' | 'red' | 'blue' | 'orange';
        content?: {
          [k: string]: unknown;
        }[];
        images?: {
          image: string | Media;
          content?: string;
          id?: string;
        }[];
        id?: string;
        blockName?: string;
        blockType: 'image-grid';
      }
    | {
        stats?: {
          stat?: string;
          description?: string;
          id?: string;
        }[];
        images?: {
          image: string | Media;
          id?: string;
        }[];
        id?: string;
        blockName?: string;
        blockType: 'image-stat-collage';
      }
    | {
        backgroundColor?: 'none' | 'red' | 'blue' | 'orange';
        images?: {
          image: string | Media;
          id?: string;
        }[];
        id?: string;
        blockName?: string;
        blockType: 'slider';
      }
    | {
        size: 'small' | 'medium' | 'large';
        id?: string;
        blockName?: string;
        blockType: 'spacer';
      }
    | {
        topOverlap?: 'none' | 'small' | 'medium' | 'large';
        bottomOverlap?: 'none' | 'small' | 'medium' | 'large';
        stats?: {
          stat?: string;
          description?: string;
          id?: string;
        }[];
        id?: string;
        blockName?: string;
        blockType: 'statistics';
      }
    | {
        sections?: {
          label: string;
          description: string;
          id?: string;
        }[];
        id?: string;
        blockName?: string;
        blockType: 'sticky-content';
      }
    | {
        backgroundColor?: 'none' | 'red' | 'blue' | 'orange';
        studies: string[] | Study[];
        id?: string;
        blockName?: string;
        blockType: 'study-slider';
      }
  )[];
  slug?: string;
  meta: Meta;
  updatedAt: string;
  createdAt: string;
}
export interface Media {
  id: string;
  alt: string;
  updatedAt: string;
  createdAt: string;
  url?: string;
  filename?: string;
  mimeType?: string;
  filesize?: number;
  width?: number;
  height?: number;
  sizes?: {
    card?: {
      url?: string;
      width?: number;
      height?: number;
      mimeType?: string;
      filesize?: number;
      filename?: string;
    };
    feature?: {
      url?: string;
      width?: number;
      height?: number;
      mimeType?: string;
      filesize?: number;
      filename?: string;
    };
    og?: {
      url?: string;
      width?: number;
      height?: number;
      mimeType?: string;
      filesize?: number;
      filename?: string;
    };
  };
}
export interface Study {
  id: string;
  title: string;
  featuredImage: string | Media;
  layout?: (
    | {
        ctaFields: {
          backgroundColor?: 'none' | 'red' | 'blue' | 'orange';
          content: {
            [k: string]: unknown;
          }[];
          feature: 'none' | 'cpa';
          links?: {
            link: {
              type?: 'reference' | 'custom';
              newTab?: boolean;
              reference: {
                value: string | Page;
                relationTo: 'pages';
              };
              url: string;
              label: string;
            };
            id?: string;
          }[];
        };
        id?: string;
        blockName?: string;
        blockType: 'cta';
      }
    | {
        backgroundColor?: 'none' | 'red' | 'blue' | 'orange';
        columns?: {
          width: 'oneThird' | 'half' | 'twoThirds' | 'full';
          alignment: 'left' | 'center' | 'right';
          content: {
            [k: string]: unknown;
          }[];
          id?: string;
        }[];
        accentLine?: boolean;
        accentLineAlignment?: 'left' | 'right';
        paddingTop?: 'none' | 'small' | 'medium' | 'large';
        paddingBottom?: 'none' | 'small' | 'medium' | 'large';
        id?: string;
        blockName?: string;
        blockType: 'content';
      }
    | {
        actions?: {
          headline: string;
          link: {
            type?: 'reference' | 'custom';
            newTab?: boolean;
            reference: {
              value: string | Page;
              relationTo: 'pages';
            };
            url: string;
            label: string;
            appearance?: 'default' | 'primary' | 'secondary';
          };
          id?: string;
        }[];
        id?: string;
        blockName?: string;
        blockType: 'cta-grid';
      }
    | {
        image: string | Media;
        type: 'card' | 'feature';
        caption?: {
          [k: string]: unknown;
        }[];
        id?: string;
        blockName?: string;
        blockType: 'image';
      }
    | {
        images?: {
          image: string | Media;
          id?: string;
        }[];
        id?: string;
        blockName?: string;
        blockType: 'image-collage';
      }
    | {
        backgroundColor?: 'none' | 'red' | 'blue' | 'orange';
        content: {
          [k: string]: unknown;
        }[];
        enableCTA?: boolean;
        link?: {
          type?: 'reference' | 'custom';
          newTab?: boolean;
          reference: {
            value: string | Page;
            relationTo: 'pages';
          };
          url: string;
          label: string;
          appearance?: 'default' | 'primary' | 'secondary';
        };
        images?: {
          image: string | Media;
          id?: string;
        }[];
        id?: string;
        blockName?: string;
        blockType: 'image-content-collage';
      }
    | {
        backgroundColor?: 'none' | 'red' | 'blue' | 'orange';
        content?: {
          [k: string]: unknown;
        }[];
        images?: {
          image: string | Media;
          content?: string;
          id?: string;
        }[];
        id?: string;
        blockName?: string;
        blockType: 'image-grid';
      }
    | {
        stats?: {
          stat?: string;
          description?: string;
          id?: string;
        }[];
        images?: {
          image: string | Media;
          id?: string;
        }[];
        id?: string;
        blockName?: string;
        blockType: 'image-stat-collage';
      }
    | {
        backgroundColor?: 'none' | 'red' | 'blue' | 'orange';
        images?: {
          image: string | Media;
          id?: string;
        }[];
        id?: string;
        blockName?: string;
        blockType: 'slider';
      }
    | {
        size: 'small' | 'medium' | 'large';
        id?: string;
        blockName?: string;
        blockType: 'spacer';
      }
    | {
        topOverlap?: 'none' | 'small' | 'medium' | 'large';
        bottomOverlap?: 'none' | 'small' | 'medium' | 'large';
        stats?: {
          stat?: string;
          description?: string;
          id?: string;
        }[];
        id?: string;
        blockName?: string;
        blockType: 'statistics';
      }
    | {
        sections?: {
          label: string;
          description: string;
          id?: string;
        }[];
        id?: string;
        blockName?: string;
        blockType: 'sticky-content';
      }
    | {
        backgroundColor?: 'none' | 'red' | 'blue' | 'orange';
        studies: string[] | Study[];
        id?: string;
        blockName?: string;
        blockType: 'study-slider';
      }
  )[];
  previewImages?: {
    image: string | Media;
    id?: string;
  }[];
  client?: string;
  location?: string;
  categories?: string[] | Category[];
  slug?: string;
  meta: Meta;
  updatedAt: string;
  createdAt: string;
}
export interface Category {
  id: string;
  title: string;
  slug?: string;
  updatedAt: string;
  createdAt: string;
}
export interface Meta {
  title: string;
  description: string;
  type: 'website' | 'article' | 'profile' | 'book' | 'video.movie' | 'video.tv_show' | 'video.episode' | 'video.other';
  article?: MetaArticle;
  book?: MetaBook;
  movie?: MetaMovie;
  videoEpisode?: MetaVideoEpisode;
  videoTvShow?: MetaTVShow;
  videoOther?: MetaVideoOther;
  profile?: MetaProfile;
  ogImage?: string | Media;
}
export interface MetaArticle {
  author?: {
    profile?: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    gender?: string;
    id?: string;
  }[];
  section?: string;
  tag?: {
    tag: string;
    id?: string;
  }[];
  publishedAt?: string;
  updatedAt?: string;
  outdatedAt?: string;
}
export interface MetaBook {
  author?: {
    profile?: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    gender?: string;
    id?: string;
  }[];
  'book:isbn'?: string;
  publishedAt?: string;
  tag?: {
    tag: string;
    id?: string;
  }[];
}
export interface MetaMovie {
  actor?: {
    profile?: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    gender?: string;
    role?: string;
    id?: string;
  }[];
  director?: {
    profile?: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    gender?: string;
    id?: string;
  }[];
  writer?: {
    profile?: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    gender?: string;
    id?: string;
  }[];
  duration?: number;
  releaseDate?: string;
  tag?: {
    tag: string;
    id?: string;
  }[];
}
export interface MetaVideoEpisode {
  actor?: {
    profile?: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    gender?: string;
    role?: string;
    id?: string;
  }[];
  director?: {
    profile?: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    gender?: string;
    id?: string;
  }[];
  writer?: {
    profile?: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    gender?: string;
    id?: string;
  }[];
  duration?: number;
  releaseDate?: string;
  tag?: {
    tag: string;
    id?: string;
  }[];
  videoSeries?: {
    tvShow?: string;
    actor?: {
      profile?: string;
      firstName?: string;
      lastName?: string;
      username?: string;
      gender?: string;
      role?: string;
      id?: string;
    }[];
    director?: {
      profile?: string;
      firstName?: string;
      lastName?: string;
      username?: string;
      gender?: string;
      id?: string;
    }[];
    writer?: {
      profile?: string;
      firstName?: string;
      lastName?: string;
      username?: string;
      gender?: string;
      id?: string;
    }[];
    duration?: number;
    releaseDate?: string;
    tag?: {
      tag: string;
      id?: string;
    }[];
  };
}
export interface MetaTVShow {
  actor?: {
    profile?: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    gender?: string;
    role?: string;
    id?: string;
  }[];
  director?: {
    profile?: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    gender?: string;
    id?: string;
  }[];
  writer?: {
    profile?: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    gender?: string;
    id?: string;
  }[];
  duration?: number;
  releaseDate?: string;
  tag?: {
    tag: string;
    id?: string;
  }[];
}
export interface MetaVideoOther {
  actor?: {
    profile?: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    gender?: string;
    role?: string;
    id?: string;
  }[];
  director?: {
    profile?: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    gender?: string;
    id?: string;
  }[];
  writer?: {
    profile?: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    gender?: string;
    id?: string;
  }[];
  duration?: number;
  releaseDate?: string;
  tag?: {
    tag: string;
    id?: string;
  }[];
}
export interface MetaProfile {
  firstName?: string;
  lastName?: string;
  username?: string;
  gender?: string;
}
export interface FormSubmission {
  id: string;
  from?: string;
  message?: string;
  source?: string;
  updatedAt: string;
  createdAt: string;
}
export interface User {
  id: string;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string;
  resetPasswordExpiration?: string;
  salt?: string;
  hash?: string;
  loginAttempts?: number;
  lockUntil?: string;
  password?: string;
}
export interface MegaMenu {
  id: string;
  nav?: {
    link: {
      type?: 'reference' | 'custom';
      newTab?: boolean;
      reference: {
        value: string | Page;
        relationTo: 'pages';
      };
      url: string;
      label: string;
      appearance?: 'default' | 'primary' | 'secondary';
    };
    id?: string;
  }[];
  updatedAt?: string;
  createdAt?: string;
}
export interface SocialMedia {
  id: string;
  links?: {
    label: string;
    url: string;
    id?: string;
  }[];
  updatedAt?: string;
  createdAt?: string;
}
export interface Footer {
  id: string;
  nav?: {
    link: {
      type?: 'reference' | 'custom';
      newTab?: boolean;
      reference: {
        value: string | Page;
        relationTo: 'pages';
      };
      url: string;
      label: string;
      appearance?: 'default' | 'primary' | 'secondary';
    };
    id?: string;
  }[];
  updatedAt?: string;
  createdAt?: string;
}
export interface Site {
  id: string;
  meta: {
    title: string;
    description: string;
    twitter?: string;
    ogImage: string | Media;
  };
  updatedAt?: string;
  createdAt?: string;
}
