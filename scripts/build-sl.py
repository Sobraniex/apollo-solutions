"""Build the crawlable Slovenian homepage from the bilingual source page."""

from html import escape
from html.parser import HTMLParser
from pathlib import Path
import re


ROOT = Path(__file__).resolve().parents[1]
EN_URL = "https://sobraniex.github.io/apollo-solutions/"
SL_URL = EN_URL + "sl/"


class SlovenianPage(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=False)
        self.output = []
        self.replacing = None

    def start(self, tag, raw, attrs):
        if self.replacing:
            raise ValueError(f"Nested markup inside translated <{self.replacing}>: <{tag}>")
        values = dict(attrs)

        def prefix_local(match):
            name, url = match.groups()
            if url.startswith(("#", "/", "../", "http:", "https:", "mailto:", "data:")):
                return match.group(0)
            return f'{name}="../{url}"'

        raw = re.sub(r'\b(href|src)="([^"]+)"', prefix_local, raw)
        if values.get("id") == "langBtn":
            raw = raw.replace('href="../sl/"', 'href="../"')
            raw = raw.replace('aria-label="Switch to Slovenian"', 'aria-label="Switch to English"')
        self.output.append(raw)
        if "data-sl" in values:
            self.output.append(escape(values["data-sl"], quote=False))
            self.replacing = tag

    def handle_starttag(self, tag, attrs):
        self.start(tag, self.get_starttag_text(), attrs)

    def handle_startendtag(self, tag, attrs):
        if self.replacing:
            raise ValueError(f"Self-closing markup inside translated <{self.replacing}>: <{tag}>")
        self.start(tag, self.get_starttag_text(), attrs)
        self.replacing = None

    def handle_endtag(self, tag):
        if self.replacing:
            if tag != self.replacing:
                raise ValueError(f"Unexpected </{tag}> inside translated <{self.replacing}>")
            self.replacing = None
        self.output.append(f"</{tag}>")

    def handle_data(self, data):
        if not self.replacing:
            self.output.append(data)

    def handle_entityref(self, name):
        if not self.replacing:
            self.output.append(f"&{name};")

    def handle_charref(self, name):
        if not self.replacing:
            self.output.append(f"&#{name};")

    def handle_comment(self, data):
        if not self.replacing:
            self.output.append(f"<!--{data}-->")

    def handle_decl(self, decl):
        self.output.append(f"<!{decl}>")


source = (ROOT / "index.html").read_text(encoding="utf-8")
page = SlovenianPage()
page.feed(source)
html = "".join(page.output)
html = html.replace('<html lang="en">', '<html lang="sl">')
html = html.replace('<a id="langBtn" class="language" href="../" aria-label="Switch to English">SL</a>', '<a id="langBtn" class="language" href="../" aria-label="Switch to English">EN</a>')
html = html.replace('<title>Dental Practice Software & Workflow Tools | Apollo Solutions</title>', '<title>Program za zobozdravstveno ordinacijo | Apollo Solutions</title>')
html = html.replace('content="Apollo Solutions builds focused workflow software for independent dental practices. Explore Hermes Dental for appointments, patient records, treatment plans, and billing on macOS."', 'content="Apollo Solutions razvija program za vodenje zobozdravstvene ordinacije. Hermes Dental združuje termine, kartoteke, načrte zdravljenja in račune na Macu."')
html = html.replace('content="Apollo Solutions — Dental Practice Software"', 'content="Apollo Solutions — Program za zobozdravstveno ordinacijo"')
html = html.replace('content="Focused workflow software for independent dental practices. Meet Hermes Dental, Apollo’s first product."', 'content="Program za samostojne zobozdravstvene ordinacije. Spoznajte Hermes Dental, prvi Apollov izdelek."')
html = html.replace(f'href="{EN_URL}" />\n  <link rel="alternate"', f'href="{SL_URL}" />\n  <link rel="alternate"', 1)
html = html.replace(f'property="og:url" content="{EN_URL}"', f'property="og:url" content="{SL_URL}"')
html = html.replace('alt="Hermes Dental appointment schedule"', 'alt="Urnik terminov v Hermes Dental"')
html = html.replace('<figcaption id="productCaption">Inside Hermes Dental: the appointment schedule.</figcaption>', '<figcaption id="productCaption">Pogled v Hermes Dental: urnik terminov.</figcaption>')
html = html.replace('aria-label="Main navigation"', 'aria-label="Glavna navigacija"')
html = html.replace('aria-label="Product screenshots"', 'aria-label="Zasloni programa"')

target = ROOT / "sl" / "index.html"
target.parent.mkdir(exist_ok=True)
target.write_text(html, encoding="utf-8")
