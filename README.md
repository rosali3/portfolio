# Rozaliia Nabiullina Portfolio

An English-language static portfolio with two independent controls: a professional focus switch (ML Engineer or Research Scientist) and a layout switch (simple resume or visual portfolio). The simple layout is the default. The downloadable plain-text resume uses straightforward headings and avoids columns, tables and decorative symbols for ATS parsing.

Live site: https://rosali3.github.io/portfolio/

## Publication images

The visual layout presents one publication at a time in a sliding gallery, with keyboard and touch navigation. The eLIBRARY paper now includes Figure 2 extracted from the PDF supplied by the author. The simple layout presents all publications as text.

## Publishing

Push changes to `main` in https://github.com/rosali3/portfolio. GitHub Actions publishes the site. No build step is required.

The former source DOCX was removed from the current site because it contained a phone number. Earlier Git commits may still retain that file; removing those historical references requires a separate repository-history cleanup.
