# DLF-AIG Application Profile Clearinghouse Project

The Clearinghouse project is intended to be an extensible collection/repository of metadata application profiles, mappings, and related specifications that aid or guide descriptive metadata conventions in digital repository collections.

## How to add Your Institution's Metadata Documents

### Via Google Docs

Submit your documents using this [Google Docs Form](https://docs.google.com/forms/d/e/1FAIpQLSeXsmlLo3S7lJF82LGTOMoMpA4vg_T38Ez47gQoU6P6KaFwQg/viewform).

### Via Pull Request

First, [fork this repository](https://github.com/scottythered/apclearing/fork).

Add your document/file to `/public/assets/data/[institution-name]`.

Edit (or add) your institution at `/public/_categories/[institution-name].json` using these parameters:

``` javascript
"index": {
  "name": "[institution-name]",
  "subtitle": "[Your institution's name]",
  "tags": ["tags"], // use one or more of the following: 'application-profile', 'mapping', 'code'
  "about": "institution description", // a description of your institution
  "site": "institution's URL",
  "image": "category-image.jpg", // An image for your institution is required -- size MUST be 350x195 pixels
  "books": [
    {
      "title": "title",
      "description": "description",
      "year": 2014, // the year the document was published or otherwise made available
      "version": "4.0", // version of the document/file
      "kind": "pdf", // file format -- eg, PDF, text, ZIP, CSV, Python, etc.
      "image": "cover.jpg", // An image for your doc type is required -- "app-pro.png," "code.png" or "map-cross.png"
      "lang": "EN", // book languagem using ISO 639-3 codes: EN, PT-BR, ES, etc.
      "url": "url to download", // put in the file and folder you added to /public/assets/data/ and we will finish the URL
      "added_at": "20161112" // Date this document/file was submitted to the Clearinghouse (YYYYMMDD)
    }
  ]
},
```

## License

MIT - http://caio-ribeiro-pereira.mit-license.org
