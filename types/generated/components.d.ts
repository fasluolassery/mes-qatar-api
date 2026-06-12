import type { Schema, Struct } from '@strapi/strapi';

export interface ElementsLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    link: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_social_links';
  info: {
    displayName: 'Social Link';
  };
  attributes: {
    platform: Schema.Attribute.Enumeration<
      ['Facebook', 'Instagram', 'LinkedIn', 'Twitter', 'YouTube']
    >;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsStat extends Struct.ComponentSchema {
  collectionName: 'components_elements_stats';
  info: {
    displayName: 'Stat';
    icon: 'list';
  };
  attributes: {
    icon: Schema.Attribute.String;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LayoutFooter extends Struct.ComponentSchema {
  collectionName: 'components_layout_footers';
  info: {
    displayName: 'Footer';
  };
  attributes: {
    columns: Schema.Attribute.Component<'layout.footer-column', true>;
    copyrightText: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    socialLinks: Schema.Attribute.Component<'elements.social-link', true>;
  };
}

export interface LayoutFooterColumn extends Struct.ComponentSchema {
  collectionName: 'components_layout_footer_columns';
  info: {
    displayName: 'Footer Column';
  };
  attributes: {
    links: Schema.Attribute.Component<'elements.link', true>;
    title: Schema.Attribute.String;
  };
}

export interface LayoutNavbar extends Struct.ComponentSchema {
  collectionName: 'components_layout_navbars';
  info: {
    displayName: 'Navbar';
  };
  attributes: {
    ctaButton: Schema.Attribute.Component<'elements.link', false>;
    links: Schema.Attribute.Component<'elements.link', true>;
    logo: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
  };
}

export interface SectionsBlogsPreview extends Struct.ComponentSchema {
  collectionName: 'components_sections_blogs_previews';
  info: {
    displayName: 'Blogs Preview';
  };
  attributes: {
    button: Schema.Attribute.Component<'elements.link', false>;
    description: Schema.Attribute.Text;
    tagline: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsCompletedEvents extends Struct.ComponentSchema {
  collectionName: 'components_sections_completed_events';
  info: {
    description: '';
    displayName: 'Completed Events';
  };
  attributes: {
    description: Schema.Attribute.Text;
    tagline: Schema.Attribute.String;
    title: Schema.Attribute.String;
    viewAllButton: Schema.Attribute.Component<'elements.link', false>;
  };
}

export interface SectionsEventsPreview extends Struct.ComponentSchema {
  collectionName: 'components_sections_events_previews';
  info: {
    displayName: 'Events Preview';
  };
  attributes: {
    description: Schema.Attribute.Text;
    tagline: Schema.Attribute.String;
    title: Schema.Attribute.String;
    viewAllButton: Schema.Attribute.Component<'elements.link', false>;
  };
}

export interface SectionsHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_heroes';
  info: {
    displayName: 'Hero';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
    ctaButtons: Schema.Attribute.Component<'elements.link', true>;
    description: Schema.Attribute.Text;
    stats: Schema.Attribute.Component<'elements.stat', true>;
    tagline: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionsIntroduction extends Struct.ComponentSchema {
  collectionName: 'components_sections_introductions';
  info: {
    displayName: 'Introduction';
  };
  attributes: {
    button: Schema.Attribute.Component<'elements.link', false>;
    content: Schema.Attribute.Text;
    sideImage: Schema.Attribute.Media<'images' | 'files'>;
    subTitle: Schema.Attribute.String;
    tagline: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionsPageHeader extends Struct.ComponentSchema {
  collectionName: 'components_sections_page_headers';
  info: {
    description: 'High-end institutional header for archive and standard pages';
    displayName: 'Page Header';
    icon: 'heading';
  };
  attributes: {
    description: Schema.Attribute.Text;
    tagline: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionsTeamGrid extends Struct.ComponentSchema {
  collectionName: 'components_sections_team_grids';
  info: {
    displayName: 'Team Grid';
  };
  attributes: {
    description: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SharedMetaSocial extends Struct.ComponentSchema {
  collectionName: 'components_shared_meta_socials';
  info: {
    description: 'Customized sharing card details for specific social networks';
    displayName: 'Meta Social';
    icon: 'share-alt';
  };
  attributes: {
    description: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
    socialNetwork: Schema.Attribute.Enumeration<['Facebook', 'Twitter']> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: 'Enterprise-grade Search Engine Optimization settings';
    displayName: 'SEO';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    keywords: Schema.Attribute.String;
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaImage: Schema.Attribute.Media<'images'>;
    metaRobots: Schema.Attribute.String;
    metaSocial: Schema.Attribute.Component<'shared.meta-social', true>;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    metaViewport: Schema.Attribute.String;
    structuredData: Schema.Attribute.JSON;
  };
}

export interface SharedTheme extends Struct.ComponentSchema {
  collectionName: 'components_shared_themes';
  info: {
    description: 'Global style settings grouped by section';
    displayName: 'Theme';
    icon: 'brush';
  };
  attributes: {
    buttons: Schema.Attribute.Component<'shared.theme-buttons', false>;
    footer: Schema.Attribute.Component<'shared.theme-footer', false>;
    hero: Schema.Attribute.Component<'shared.theme-hero', false>;
    intro: Schema.Attribute.Component<'shared.theme-intro', false>;
    navbar: Schema.Attribute.Component<'shared.theme-navbar', false>;
  };
}

export interface SharedThemeButtons extends Struct.ComponentSchema {
  collectionName: 'components_shared_theme_buttons';
  info: {
    description: 'Button styling colors';
    displayName: 'ThemeButtons';
    icon: 'hand-point-up';
  };
  attributes: {
    outlineButtonBorderColor: Schema.Attribute.String;
    outlineButtonTextColor: Schema.Attribute.String;
    primaryButtonBgColor: Schema.Attribute.String;
    primaryButtonTextColor: Schema.Attribute.String;
    secondaryButtonBgColor: Schema.Attribute.String;
    secondaryButtonTextColor: Schema.Attribute.String;
  };
}

export interface SharedThemeFooter extends Struct.ComponentSchema {
  collectionName: 'components_shared_theme_footers';
  info: {
    description: 'Footer styling colors';
    displayName: 'ThemeFooter';
    icon: 'layout';
  };
  attributes: {
    footerBgColor: Schema.Attribute.String;
    footerLinkHoverColor: Schema.Attribute.String;
    footerTextColor: Schema.Attribute.String;
  };
}

export interface SharedThemeHero extends Struct.ComponentSchema {
  collectionName: 'components_shared_theme_heros';
  info: {
    description: 'Hero styling colors';
    displayName: 'ThemeHero';
    icon: 'image';
  };
  attributes: {
    heroDescriptionColor: Schema.Attribute.String;
    heroOverlayEndColor: Schema.Attribute.String;
    heroOverlayStartColor: Schema.Attribute.String;
    heroStatValueColor: Schema.Attribute.String;
    heroTaglineColor: Schema.Attribute.String;
    heroTitleColor: Schema.Attribute.String;
    heroTitleHighlightColor: Schema.Attribute.String;
  };
}

export interface SharedThemeIntro extends Struct.ComponentSchema {
  collectionName: 'components_shared_theme_intros';
  info: {
    description: 'Introduction section styling colors';
    displayName: 'ThemeIntro';
    icon: 'paragraph';
  };
  attributes: {
    introBgColor: Schema.Attribute.String;
    introDescriptionColor: Schema.Attribute.String;
    introImageFrameColor: Schema.Attribute.String;
    introSubtitleColor: Schema.Attribute.String;
    introSubtitleLineColor: Schema.Attribute.String;
    introTaglineColor: Schema.Attribute.String;
    introTitleColor: Schema.Attribute.String;
  };
}

export interface SharedThemeNavbar extends Struct.ComponentSchema {
  collectionName: 'components_shared_theme_navbars';
  info: {
    description: 'Navbar styling colors';
    displayName: 'ThemeNavbar';
    icon: 'align-justify';
  };
  attributes: {
    navbarBgColor: Schema.Attribute.String;
    navbarLinkColor: Schema.Attribute.String;
    navbarLinkHoverColor: Schema.Attribute.String;
    siteNameColor: Schema.Attribute.String;
    subTextColor: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'elements.link': ElementsLink;
      'elements.social-link': ElementsSocialLink;
      'elements.stat': ElementsStat;
      'layout.footer': LayoutFooter;
      'layout.footer-column': LayoutFooterColumn;
      'layout.navbar': LayoutNavbar;
      'sections.blogs-preview': SectionsBlogsPreview;
      'sections.completed-events': SectionsCompletedEvents;
      'sections.events-preview': SectionsEventsPreview;
      'sections.hero': SectionsHero;
      'sections.introduction': SectionsIntroduction;
      'sections.page-header': SectionsPageHeader;
      'sections.team-grid': SectionsTeamGrid;
      'shared.meta-social': SharedMetaSocial;
      'shared.seo': SharedSeo;
      'shared.theme': SharedTheme;
      'shared.theme-buttons': SharedThemeButtons;
      'shared.theme-footer': SharedThemeFooter;
      'shared.theme-hero': SharedThemeHero;
      'shared.theme-intro': SharedThemeIntro;
      'shared.theme-navbar': SharedThemeNavbar;
    }
  }
}
