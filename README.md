# Matilda

## Commands

- `npm run build` - Builds files from `/content` into `/public`
- `npm run clean` - Removes `/public`
- `npm run server` - Start a development server

## Templates

Your base template must make available, a `{{ main }}` expression, as this is where Matilda will inject your page content.

### Engine

Templates (`/templates`) and content (`/content`) support the [handlebars](https://handlebarsjs.com/) templating engine. You can read more about the language from [their documentation](https://handlebarsjs.com/guide/).

Matilda makes a `matilda` object available within your templates that contains the current Matilda version and node environment. These can be accessed with the following expressions:

```
{{ matilda.version }}

{{ matilda.env }}
```
