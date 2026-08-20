import { Button, Eyebrow, useTitle } from "../components/ui";
import { IMG } from "../data/images";

export default function NotFound() {
  useTitle("Page not found — Luna Café");
  return (
    <section className="grid min-h-screen md:grid-cols-2">
      <div className="flex items-center px-6 pt-36 pb-20 md:px-14 md:pt-32">
        <div>
          <Eyebrow>404</Eyebrow>
          <h1 className="font-display mt-6 max-w-lg text-[11vw] leading-[0.98] sm:text-5xl md:text-[3.6rem]">
            This moment seems to have gone somewhere else.
          </h1>
          <p className="mt-7 max-w-sm text-[15px] font-light leading-[1.9] text-taupe">
            Let's get you back to Luna.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button to="/">Return home</Button>
            <Button to="/menu" variant="outline" arrow>
              View the menu
            </Button>
          </div>
        </div>
      </div>
      <div className="hidden overflow-hidden bg-beige md:block">
        <img
          src={IMG.quietCorner}
          alt="A quiet corner of Luna Café"
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  );
}
