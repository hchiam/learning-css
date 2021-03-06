# CSS print example

(Use [`parcel`](https://github.com/hchiam/learning-parcel))

```sh
parcel index.html
# http://localhost:1234
```

Demo of:

- `orphans` and `widows`
- `page-break-before` and `page-break-after`
- `page-break-inside`

## Avoid page breaks in paragraphs with `page-break-inside: avoid`

![Page break inside: avoid](page-break-inside-avoid.png)

## `orphans: 7` for minimum 7 lines before page break

![orphans: 7 for minimum 7 lines before page break](orphans-7-lines-before-page-break.png)

## `orphans: 2` for minimum 2 lines before page break

![orphans: 2 for minimum 2 lines before page break](orphans-2-lines-before-page-break.png)

## Neither page break set nor orphans set

![Neither page break set nor orphans set](neither-page-break-nor-orphans-set.png)
