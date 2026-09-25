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
html = html.replace('<title>DGX Spark AI Models & Installation | Apollo Solutions</title>', '<title>Modeli AI in namestitev DGX Spark | Apollo Solutions</title>')
html = html.replace('content="Explore six open-model configurations for NVIDIA DGX Sparks and Apollo’s 1, 2, and 4 Spark installation packages. Hermes Dental remains a separate Apollo product."', 'content="Raziščite šest konfiguracij odprtih modelov za NVIDIA DGX Spark ter Apollove pakete namestitve za eno, dve ali štiri naprave. Hermes Dental ostaja ločen izdelek."')
html = html.replace('content="Apollo Solutions — DGX Spark AI Models & Installation"', 'content="Apollo Solutions — Modeli AI in namestitev DGX Spark"')
html = html.replace('content="Six DGX Spark model configurations, installation packages from €500, and focused Apollo software."', 'content="Šest konfiguracij modelov za DGX Spark, paketi namestitve od 500 € in Apollovi programi."')
html = html.replace(f'href="{EN_URL}" />\n  <link rel="alternate"', f'href="{SL_URL}" />\n  <link rel="alternate"', 1)
html = html.replace(f'property="og:url" content="{EN_URL}"', f'property="og:url" content="{SL_URL}"')
html = html.replace('aria-label="Main navigation"', 'aria-label="Glavna navigacija"')

target = ROOT / "sl" / "index.html"
target.parent.mkdir(exist_ok=True)
target.write_text(html, encoding="utf-8")
