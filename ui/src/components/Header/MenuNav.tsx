import { createResource, Show, For } from "solid-js";

import { Loader } from "../Loader";
import { getFromApi } from "../../utils/api";
import CategoryInterface from "../../interfaces/category";

import styles from "./assets/header.module.sass";

async function fetchCategories() {
  const response = await getFromApi("categories/");
  return response.data;
}

const AllProductsCategory: CategoryInterface = {
  id: -1,
  slug: "all-products",
  title: "Все товары",
};

export default function MenuNav(props: { toggleMenu: () => void }) {
  const [categories] = createResource(fetchCategories);

  return (
    <>
      <nav>
        <Show when={!categories.loading} fallback={<Loader />}>
          <ul class={styles.nav__list}>
            <Show
              when={!categories.error}
              fallback={<p>Error... {categories.error.message}</p>}
            >
              <For each={categories()}>
                {(category, index) => (
                  <CategoryLink
                    category={category}
                    toggleMenu={props.toggleMenu}
                  />
                )}
              </For>
              <CategoryLink
                category={AllProductsCategory}
                toggleMenu={props.toggleMenu}
              />
            </Show>
          </ul>
        </Show>
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
