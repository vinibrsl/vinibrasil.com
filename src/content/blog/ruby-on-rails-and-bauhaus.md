---
title: "Ruby on Rails and Bauhaus"
description: "What an art school from 1919 has to do with a web framework."
pubDate: 2024-08-25
---

Not long ago, web development was done in a very different way from what we
have today. Enterprise languages and frameworks cornered the market: no
automated tests, complex solutions to simple problems, and plenty of other
issues. DHH, a Bauhaus rebel for his time, transformed the scene by thinking
design-driven, developer-first, and simpler. "Form follows function" was
applied to software engineering at last.

## Back to 2004

![Web development in 2004 — enterprise stacks and heavyweight frameworks](/images/ruby-on-rails-and-bauhaus/2004-web-dev.jpeg)

2004 was the year Facebook was born, Firefox was on the rise, iPods were
everywhere, and blogging took off. Web development back then was all about
ASP.NET, JavaServer Faces, ColdFusion, and PHP 3. Ruby? Nowhere to be seen on
the TIOBE rankings yet.

Ruby's story starts with Yukihiro "Matz" Matsumoto in Japan. Even though
version 1.0 was released on Christmas 1993, not many people knew about it when
Rails came onto the scene in 2004. Ruby wasn't exactly popular, and Rails had
plenty of reasons to flop:

- Rails used this weird programming language called Ruby.
- It defaulted to MySQL (seriously, what kind of database is that?).
- It didn't even support Windows (you've gotta be kidding, right?!).

## Back to the 1920s

![The Bauhaus school — form follows function](/images/ruby-on-rails-and-bauhaus/bauhaus.jpeg)

Bauhaus was founded in 1919, and it was way ahead of its time. It grew into
one of the biggest cultural movements of the 20th century. Bauhaus wasn't just
about architecture — it touched everything from graphic design to typography,
product design, and even furniture. Steve Jobs? Yeah, he was influenced by
Bauhaus too, and you can see it in Apple's clean, minimalist design. The key
ideas of the art school were:

1. Form follows function
2. Minimalism
3. Smart use of resources
4. Simplicity and effectiveness
5. Constant development
6. Paradigm shift
7. Uncomplicated beauty

Rails came out of 37signals, a web software company started in 1999, and their
design-first mentality has a lot in common with Bauhaus.

> Simple interfaces are easier to use, understand, and maintain than flashy
> counterparts. Usability should take precedence over cool.

![37signals and its design-first philosophy](/images/ruby-on-rails-and-bauhaus/37signals.jpeg)

## The Rails boom

<figure class="embed">
  <div class="embed-frame">
    <iframe src="https://www.youtube-nocookie.com/embed/Gzj723LkRJY?rel=0"
      title="Create a blog in 15 minutes with Ruby on Rails"
      loading="lazy" allowfullscreen></iframe>
  </div>
  <figcaption class="fig-cap"><span class="fig-num">FIG.</span> DHH builds a
  blog engine in 15 minutes with Ruby on Rails (2005)</figcaption>
</figure>

In 2005, DHH presented "how to build a blog engine in 15 minutes with Ruby on
Rails" at a *libre* software conference in Porto Alegre, Brazil.

Using a MacBook, Terminal.app, TextMate, and Ruby on Rails, Danish programmer
David Heinemeier Hansson built a blog engine in just 15 minutes with Rails
generators. It was revolutionary — seamless, minimal, simple, and a total
game-changer. Ruby on Rails brought a new philosophy to the programming world:
software development could be simple, minimalist, and effective, without all
the red tape.

In 2006, just a year after that video, Ruby became the most popular
programming language of the year, according to the TIOBE Index. This mid-90s
Japanese language, never even intended for this kind of use, would become a
web standard.

![Ruby's climb up the TIOBE Index](/images/ruby-on-rails-and-bauhaus/ruby-tiobe.png)

> I knew Python then. But I didn't like it, because I didn't think it was a
> true object-oriented language — OO features appeared to be an add-on.
> — Matz, creator of Ruby

Ruby's rise is closely tied to the paradigm shift brought about by Ruby on
Rails. In 2016, DHH wrote *The Rails Doctrine*, which dives deeper into the
philosophy behind the framework. It outlines how Rails isn't just about
code — it's about a mindset that embraces simplicity, productivity, and a
no-nonsense approach to software development:

> Rails' rise owed much to novel technology and timing. But advantages erode
> over time. Its enduring enabler has been its controversial doctrine.
> — DHH

## Footprints

![Rails' fingerprints — from Laravel to Phoenix](/images/ruby-on-rails-and-bauhaus/footprints.jpeg)

Bauhaus was a rebel in its time, just like Rails. The school's influence can
be seen everywhere, from Apple to Nike. Rails' philosophy has also shaped
other programming communities — take PHP, for example, which now has Laravel,
"The PHP Framework For Web Artisans," directly inspired by Rails. Phoenix, a
web framework for Elixir built to give developers peace of mind from start to
finish, also took inspiration from Rails.

This powerful influence set a new standard for web frameworks: generators,
testing by default, simplicity, and convention over configuration. Nowadays,
it's expected that any web framework will include these features Rails first
brought together.

## Maturing and staying relevant

The Ruby on Rails web framework powers tons of popular services like GitHub,
Heroku, CodeClimate, TravisCI, and Shopify. It's a widely used and loved
technology. But what sets Ruby on Rails apart from all the other options out
there today?

Nowadays, every language has its own Rails-like web framework — PHP has
Laravel, Elixir has Phoenix, and Java has the Spring Framework. Ruby on Rails
isn't as disruptive as it was in 2004, and every year Ruby developers face the
same question: "Is Rails dead in `#{Date.today.year}`?" The truth is, Rails is
still standing strong, staying true to its philosophy and constantly
improving. Some of the most recent big releases include:

- **Hotwire**, a new approach that builds fast, interactive apps without heavy
  JavaScript frameworks.
- **Built-in encryption**, for securely encrypting sensitive data in the
  database.
- **Asynchronous database queries.**
- **Parallel test execution.**
- Not to mention **Ruby 3** improvements and new features, such as Ractors
  (Erlang-like actor-model concurrency), typing definitions, and more.
