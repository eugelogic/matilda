# Matilda

## Commands

- `npm run build` - Builds files from `/content` into `/public`
- `npm run clean` - Removes `/public`
- `npm run server` - Start a development server

## Content

Currently, only `.html` files are supported for content.

### Frontmatter

You can add frontmatter to your HTML content files in order to share data between your content and your templates. This data is made available via a `{{ page.* }}` expression, and can be used within both contnet, and template files.

An example of this might be:

```
---
title: 'Hello World'
---

<h1>{{ page.title }}</h1>
```

In your template, you could then do:

```
<title>{{ page.title }} | Matilda</title>
```

## Templates

Your base template must make available, a `{{ main }}` expression, as this is where Matilda will inject your page content.

### Engine

Templates (`/templates`) and content (`/content`) support the [handlebars](https://handlebarsjs.com/) templating engine. You can read more about the language from [their documentation](https://handlebarsjs.com/guide/).

Matilda makes a `matilda` object available within your templates that contains the current Matilda version and node environment. These can be accessed with the following expressions:

```
{{ matilda.version }}

{{ matilda.env }}
```
