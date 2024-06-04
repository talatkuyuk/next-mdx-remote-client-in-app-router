---
title: "Test MDX Syntax in Markdown 'md' File"
author: "markdown"
date: Apr 19, 2024
summary: "summary test markdown"
---

::: note
I kept the document structure **the same** to see how markdown behaves to javascript expressions in curlybraces `{}` and mdx syntax.
:::

import Bar from "../../../mdxComponents/Bar.mjs";

**_{factorial(num) === 720 ? "export statements are active" : "export statements are disabled"}_**

_Read in {readingTime}, written by **{frontmatter.author}**_

# {frontmatter.title}

<Toc toc={toc} ordered indented maxDepth={5} tight />

## Section 1

### Heading For Components

<Hello name={props.foo} />

<CountButton />

<Dynamic />

<Bar className="i-am-imported-component" />

### Heading For Plugins

#### SubHeading For Flexible Markers

Marked texts: ==text with **yellow** phrase==, =r=text with **red** phrase==, =g=text with **green** phrase==, and =b=text with **blue** phrase==.

#### SubHeading For Emojies

Some **markdown** _content_ :+1:

#### SubHeading For Flexible Paragraphs

~a|> Alert Text Centered
~w:> Warning Text Aligned Right

#### SubHeading For Flexible Containers

::: warning 
All **JSX syntax** is omitted by the `remark` parser in markdown.

All **javascript statements** in `{ }` are considered as just text in markdown.
:::

::: tip
<span>The **markdown syntax** inside **a block-level `HTML` element** like `<p>` or `<details>` doesn't work in markdown, but works in **inline-level `HTML` elements** like `<span>`.</span>
:::

::: danger Pay Attention
The `allowDangerousHtml` is set to `true` by default in `mdx-js/mdx`. If the file is markdown "md" format, `html` elements are removed in case you don't use `rehype-raw` plugin.
<details>
  <summary>**Markdown syntax doesn't work in details-summary**</summary>
  + List item - 1
  + List item - 2
  <p>_The markdown list syntax also doesn't work !_</p>
</details>
:::

::: info Table of Contents (TOC)
The remark plugin `remark-toc` is one of the tool for creating TOC inline in the markdown files.
:::

::: details {details} Sample Details-Summary {summary}
The `remark-flexible-containers` can also make this kind of `details`-`summary` HTML elements.
:::

### Heading For Code Highlighting

```typescript:demo.ts
// prettier-ignore
function Text(text: string) {console.log(text)}
const text = "next-mdx-remote-client";
Text(text);
```

export function factorial(factor) {
  if (factor <= 1) {
    return 1;
  }
  return factor * factorial(factor - 1);
}

## Section 2

### Heading For GFM

Autolink www.example.com and `inline code`.

~one tilde strikethrough~ or ~~two tildes strikethrough~~

Here is ~deleted text~ and ++inserted text++

| Left Aligned Header  | Right Aligned Header |
| :------------------- | -------------------: |
| Content Cell         | Content Cell         |
| Content Cell         | Content Cell         |

### Heading For Miscellenous

#### SubHeading for Lists

+ List item with normal text
+ List item with **bold text**
+ List item with *italic text*

#### SubHeading For Escapes

"Authorize \<GITHUB_USER>"

version of \<operation>.\<mount> \<= 1.3.x

< 8ms (allowed one blank after "\<")

escape opening curlybraces "\{}"

#### SubHeading For Centering

~|> Centering **text** and **image** is very easy !
~|> <Image src="/images/cover.png" alt="cover" width={180} height={40} />
~|> ![cover](/images/cover.png)

#### SubHeading For Blockquates

=b=blockquate markdown element==
> The `@import` is used to **import style rules** from other valid stylesheets.

<BlockQuote>
  A custom `remark-rehype` handler made all React Components stripped out, including this. If would not, what would happened? All component names are lowercased by `rehype-raw` via `parse5` parser. This component name also would became `blockquote` luckily after lowercased and would be valid HTML tag as well. Additionally If I put empty lines inside, markdown syntax will work in the `blockquote` block-level HTML element. <span>=g=blockquate html element==</span>
</BlockQuote>

export const num = 6;

#### SubHeading For Mixing Markdown and HTML

<div class="note">
A mix of *markdown* and <em>HTML</em>.
</div>

<div class="note">
  A mix of *markdown* and <em>HTML</em>.
</div>

<div class="note">A mix of *markdown* and <em>HTML</em>.</div>

<div class="note">

A mix of *markdown* and <em>HTML</em>.

</div>

