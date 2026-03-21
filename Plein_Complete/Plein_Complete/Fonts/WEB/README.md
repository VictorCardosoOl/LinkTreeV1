# Installing Webfonts
Follow these simple Steps.

## 1.
Put `plein/` Folder into a Folder called `fonts/`.

## 2.
Put `plein.css` into your `css/` Folder.

## 3. (Optional)
You may adapt the `url('path')` in `plein.css` depends on your Website Filesystem.

## 4.
Import `plein.css` at the top of you main Stylesheet.

```
@import url('plein.css');
```

## 5.
You are now ready to use the following Rules in your CSS to specify each Font Style:
```
font-family: Plein-Light;
font-family: Plein-LightItalic;
font-family: Plein-Regular;
font-family: Plein-Italic;
font-family: Plein-Medium;
font-family: Plein-MediumItalic;
font-family: Plein-Bold;
font-family: Plein-BoldItalic;
font-family: Plein-Black;
font-family: Plein-BlackItalic;
font-family: Plein-Variable;
font-family: Plein-VariableItalic;

```
## 6. (Optional)
Use `font-variation-settings` rule to controll axes of variable fonts:
wght 300.0wght 900.0

Available axes:
'wght' (range from 300.0 to 900.0'wght' (range from 300.0 to 900.0

