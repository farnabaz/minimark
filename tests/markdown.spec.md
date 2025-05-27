# Markdown Spec

## Headings

```markdown
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
```

**Preview:**

# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

## Paragraphs

```markdown
This is a paragraph.

This is another paragraph.
```

**Preview:**

This is a paragraph.

This is another paragraph.

## Emphasis

```markdown
*Italic* _Italic_
**Bold** __Bold__
***Bold Italic*** ___Bold Italic___
```

**Preview:**

*Italic* _Italic_
**Bold** __Bold__
***Bold Italic*** ___Bold Italic___

## Blockquotes

```markdown
> This is a blockquote.
> 
> - Nested list
> - In blockquote
```

**Preview:**

> This is a blockquote.
> 
> - Nested list
> - In blockquote

## Lists

```markdown
- Unordered item 1
- Unordered item 2
  - Nested unordered item

1. Ordered item 1
2. Ordered item 2
   1. Nested ordered item
```

**Preview:**

- Unordered item 1
- Unordered item 2
  - Nested unordered item

1. Ordered item 1
2. Ordered item 2
   1. Nested ordered item

## Code

```markdown
Inline `code` example.

    Indented code block

\`\`\`
Fenced code block
\`\`\`
```

**Preview:**

Inline `code` example.

    Indented code block

```
Fenced code block
```

## Links and Images

```markdown
[Link text](https://example.com)
![Alt text](https://example.com/image.png)
```

**Preview:**

[Link text](https://example.com)
![Alt text](https://example.com/image.png)

## Horizontal Rule

```markdown
---
***
___
```

**Preview:**

---
***
___

## Tables

```markdown
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
```

**Preview:**

| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |

## HTML Blocks

```markdown
<div>
  <strong>HTML block</strong>
</div>
```

**Preview:**

<div>
  <strong>HTML block</strong>
</div>

## Inline HTML

```markdown
This is <span style="color: red;">inline HTML</span> in Markdown.
```

**Preview:**

This is <span style="color: red;">inline HTML</span> in Markdown.

## Escaping

```markdown
\*Not italic\*
```

**Preview:**

\*Not italic\*

## Task Lists

```markdown
- [x] Task 1
- [ ] Task 2
```

**Preview:**

- [x] Task 1
- [ ] Task 2

## Strikethrough

```markdown
~~Strikethrough~~
```

**Preview:**

~~Strikethrough~~

## Autolinks

```markdown
<https://example.com>
```

**Preview:**

<https://example.com>

## Footnotes (if supported)

```markdown
Here is a footnote reference,[^1]

[^1]: Here is the footnote.
```

**Preview:**

Here is a footnote reference,[^1]

[^1]: Here is the footnote.

