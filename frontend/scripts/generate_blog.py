import json
from datetime import datetime
from html import escape
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
POSTS_DIR = BASE_DIR / "content" / "posts"
BLOG_DIR = BASE_DIR / "blog"
BLOG_INDEX = BASE_DIR / "blog.html"

BLOG_DIR.mkdir(parents=True, exist_ok=True)


def format_date(date_string):
    try:
        return datetime.strptime(date_string, "%Y-%m-%d").strftime("%B %d, %Y")
    except ValueError:
        return date_string


def render_content(blocks):
    html_parts = []

    for block in blocks:
        block_type = block.get("type")
        text = escape(block.get("text", ""))

        if block_type == "heading":
            html_parts.append(f"<h2>{text}</h2>")
        elif block_type == "paragraph":
            html_parts.append(f"<p>{text}</p>")

    return "\n".join(html_parts)


def build_article(post):
    slug = post["slug"]
    title = escape(post["title"])
    description = escape(post["description"])
    author = escape(post.get("author", "ITL Systems"))
    category = escape(post.get("category", "Technology"))
    date = format_date(post["date"])
    content_html = render_content(post.get("content", []))

    article_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>{title} | ITL Systems</title>
  <meta name="description" content="{description}">

  <style>
    * {{
      box-sizing: border-box;
    }}

    body {{
      margin: 0;
      font-family: Arial, sans-serif;
      background: #ffffff;
      color: #0f172a;
    }}

    header {{
      background: linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%);
      padding: 28px 8% 80px;
    }}

    nav {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 70px;
    }}

    .logo {{
      font-size: 24px;
      font-weight: bold;
    }}

    .nav-links a {{
      margin-left: 24px;
      text-decoration: none;
      color: #334155;
      font-weight: 600;
    }}

    .article-hero {{
      max-width: 900px;
    }}

    .article-hero h1 {{
      font-size: 50px;
      line-height: 1.12;
      margin-bottom: 18px;
    }}

    .meta {{
      color: #2563eb;
      font-weight: bold;
      margin-bottom: 20px;
    }}

    .article-hero p {{
      font-size: 20px;
      line-height: 1.7;
      color: #475569;
    }}

    main {{
      padding: 70px 8%;
    }}

    article {{
      max-width: 850px;
      margin: 0 auto;
    }}

    article h2 {{
      font-size: 32px;
      margin-top: 42px;
    }}

    article p {{
      font-size: 18px;
      line-height: 1.8;
      color: #475569;
    }}

    .cta {{
      margin-top: 50px;
      padding: 32px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 5px solid #2563eb;
      border-radius: 18px;
    }}

    .button {{
      display: inline-block;
      margin-top: 14px;
      padding: 13px 22px;
      background: #2563eb;
      color: white;
      text-decoration: none;
      border-radius: 10px;
      font-weight: bold;
    }}

    footer {{
      background: #0f172a;
      color: #cbd5e1;
      text-align: center;
      padding: 28px;
    }}

    @media (max-width: 800px) {{
      .article-hero h1 {{
        font-size: 38px;
      }}

      .nav-links {{
        display: none;
      }}
    }}
  </style>
</head>

<body>

<header>
  <nav>
    <div class="logo">ITL Systems</div>

    <div class="nav-links">
      <a href="../index.html#services">Services</a>
      <a href="../index.html#process">Process</a>
      <a href="../blog.html">Blog</a>
      <a href="../index.html#contact">Contact</a>
    </div>
  </nav>

  <div class="article-hero">
    <div class="meta">{date} · {category} · {author}</div>

    <h1>{title}</h1>

    <p>{description}</p>
  </div>
</header>

<main>
  <article>
    {content_html}

    <div class="cta">
      <h2>Need Better Systems for Your Business?</h2>

      <p>
        ITL Systems helps small businesses improve customer follow-up,
        automate workflows, and build practical cloud-based solutions.
      </p>

      <a class="button" href="../index.html#contact">
        Request a Consultation
      </a>
    </div>
  </article>
</main>

<footer>
  <p>© 2026 ITL Systems. All rights reserved.</p>
</footer>

</body>
</html>
"""

    article_path = BLOG_DIR / f"{slug}.html"
    article_path.write_text(article_html, encoding="utf-8")


def build_blog_index(posts):
    cards = []

    for post in posts:
        slug = escape(post["slug"])
        title = escape(post["title"])
        description = escape(post["description"])
        category = escape(post.get("category", "Technology"))
        date = format_date(post["date"])

        cards.append(
            f"""
    <article class="card">
      <div class="date">{date} · {category}</div>

      <h2>{title}</h2>

      <p>{description}</p>

      <a class="button" href="blog/{slug}.html">
        Read More
      </a>
    </article>
"""
        )

    cards_html = "\n".join(cards)

    blog_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>ITL Systems Blog | Small Business Technology Insights</title>

  <meta
    name="description"
    content="Practical insights about automation, cloud systems, customer follow-up, and technology strategy for small businesses."
  >

  <style>
    * {{
      box-sizing: border-box;
    }}

    body {{
      margin: 0;
      font-family: Arial, sans-serif;
      background: #ffffff;
      color: #0f172a;
    }}

    header {{
      background: linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%);
      padding: 28px 8%;
    }}

    nav {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 70px;
    }}

    .logo {{
      font-size: 24px;
      font-weight: bold;
    }}

    .nav-links a {{
      margin-left: 24px;
      text-decoration: none;
      color: #334155;
      font-weight: 600;
    }}

    .blog-hero {{
      max-width: 850px;
      padding-bottom: 70px;
    }}

    .blog-hero h1 {{
      font-size: 52px;
      margin-bottom: 20px;
    }}

    .blog-hero p {{
      font-size: 20px;
      line-height: 1.7;
      color: #475569;
    }}

    section {{
      padding: 70px 8%;
    }}

    .post-list {{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
    }}

    .card {{
      background: white;
      padding: 28px;
      border-radius: 18px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
    }}

    .card h2 {{
      margin-top: 0;
      font-size: 24px;
    }}

    .card p {{
      color: #475569;
      line-height: 1.6;
    }}

    .date {{
      color: #2563eb;
      font-weight: bold;
      font-size: 14px;
      margin-bottom: 12px;
    }}

    .button {{
      display: inline-block;
      margin-top: 14px;
      padding: 13px 22px;
      background: #2563eb;
      color: white;
      text-decoration: none;
      border-radius: 10px;
      font-weight: bold;
    }}

    footer {{
      background: #0f172a;
      color: #cbd5e1;
      text-align: center;
      padding: 28px;
    }}

    @media (max-width: 800px) {{
      .blog-hero h1 {{
        font-size: 40px;
      }}

      .nav-links {{
        display: none;
      }}
    }}
  </style>
</head>

<body>

<header>
  <nav>
    <div class="logo">ITL Systems</div>

    <div class="nav-links">
      <a href="index.html#services">Services</a>
      <a href="index.html#process">Process</a>
      <a href="blog.html">Blog</a>
      <a href="index.html#contact">Contact</a>
    </div>
  </nav>

  <div class="blog-hero">
    <h1>Small Business Technology Insights</h1>

    <p>
      Practical articles about automation, cloud systems, customer follow-up,
      digital workflows, and technology strategy for small businesses.
    </p>
  </div>
</header>

<section>
  <div class="post-list">
    {cards_html}
  </div>
</section>

<footer>
  <p>© 2026 ITL Systems. All rights reserved.</p>
</footer>

</body>
</html>
"""

    BLOG_INDEX.write_text(blog_html, encoding="utf-8")


def load_posts():
    posts = []

    for post_file in POSTS_DIR.glob("*.json"):
        with post_file.open("r", encoding="utf-8") as file:
            posts.append(json.load(file))

    posts.sort(
        key=lambda post: post.get("date", ""),
        reverse=True
    )

    return posts


def main():
    posts = load_posts()

    for post in posts:
        build_article(post)

    build_blog_index(posts)

    print(f"Generated {len(posts)} blog post(s).")
    print(f"Blog index: {BLOG_INDEX}")
    print(f"Article directory: {BLOG_DIR}")


if __name__ == "__main__":
    main()
