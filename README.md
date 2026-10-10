# blogs
[![Deploy site](https://github.com/pandaind/blogs/actions/workflows/publish.yaml/badge.svg)](https://github.com/pandaind/blogs/actions/workflows/publish.yaml)

**Website:** https://pandac.in/

Built with [Meteorite](https://github.com/pandaind/meteorite) and its `devlog` theme.

```sh
meteorite serve        # preview with live reload at http://127.0.0.1:1111
meteorite check        # find broken links and bad front matter
meteorite build        # write the site to public/
```

| Path | What it is |
|---|---|
| `content/blog/` | Posts |
| `content/projects/` | Projects (cards on the home page and `/projects/`) |
| `content/notes/` | Short notes |
| `content/resume.md` + `data/resume.yml` | Resume |
| `data/socials.yml` | Social links |
| `static/` | Images and files, copied to the site root (including `CNAME`) |
| `themes/devlog/` | The theme (a copy; `meteorite theme update` upgrades it) |
