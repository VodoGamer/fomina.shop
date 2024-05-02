import { Show, For, Resource } from "solid-js";

import { Loader } from "../Loader";
import CategoryInterface from "../../interfaces/category";

import styles from "./assets/header.module.sass";
import { TransitionGroup } from "solid-transition-group";

import "../../assets/animations.sass";

const AllProductsCategory: CategoryInterface = {
  id: -1,
  slug: "all-products",
  title: "Все товары",
};

export default function MenuNav(props: {
  toggleMenu: () => void;
  categories: Resource<CategoryInterface[]>;
}) {
  return (
    <>
      <nav>
        <ul class={styles.nav__list}>
          <Show when={props.categories.loading}>
            <Loader />
          </Show>
          <Show
            when={!props.categories.error}
            fallback={<p>Error... {props.categories.error.message}</p>}
          >
            <TransitionGroup name="list-item">
              <For each={props.categories()}>
                {(category) => (
                  <CategoryLink
                    category={category}
                    toggleMenu={props.toggleMenu}
                  />
                )}
              </For>
            </TransitionGroup>
          </Show>
          <CategoryLink
            category={AllProductsCategory}
            toggleMenu={props.toggleMenu}
          />
        </ul>
      </nav>
    </>
  );
}

function CategoryLink(props: {
  category: CategoryInterface;
  toggleMenu: () => void;
}) {
  return (
    <li class={styles.nav__item}>
      <a
        class={styles.nav__link}
        href={`/category/${props.category.slug}`}
        onClick={props.toggleMenu}
      >
        {props.category.title}
      </a>
    </li>
  );
}
