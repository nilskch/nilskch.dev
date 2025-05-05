import { BlogPosts } from "app/components/posts";
import Link from "next/link";

function InlineLink({ href, children }) {
  return (
    <Link
      href={href}
      className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 underline"
    >
      {children}
    </Link>
  );
}

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Hey, I'm Nils 👋
      </h1>
      <p className="mb-4">
        I currenly live in London and work for Palantir as a Software Engineer.
        I am building a{" "}
        <InlineLink href="https://www.palantir.com/docs/foundry/palantir-extension-for-visual-studio-code/overview">
          VSCode extension
        </InlineLink>{" "}
        for the Palantir Foundry platform that allows you to develop{" "}
        <InlineLink href="https://www.palantir.com/docs/foundry/transforms-python/transforms-pipelines">
          Python transforms
        </InlineLink>
        .
      </p>
      <p className="mb-4">
        In my spare time, I enjoy contributing to open source projects that I
        use in my day-to-day work (mostly{" "}
        <InlineLink href="https://github.com/zed-industries/zed">
          Zed
        </InlineLink>{" "}
        and <InlineLink href="https://github.com/jj-vcs/jj">Jujutsu</InlineLink>
        ). Outside of work, I love doing sports, going on hikes with my dog and
        partner, cooking, and drinking a cold beer with my best friends at the
        end of the day.
      </p>

      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  );
}
