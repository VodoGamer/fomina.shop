import { createResource, Show, For } from "solid-js";

import { Loader } from "../Loader";
import { getFromApi } from "../../utils/api";

import styles from "./assets/header.module.sass";

async function fetchCategories() {
  const response = await getFromApi("categories/");
  return response.data;
}

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
                  <li class={styles.nav__item}>
                    <a
                      class={styles.nav__link}
                      href={`/category/${category.slug}`}
                      onClick={props.toggleMenu}
                    >
                      {category.title}
                    </a>
                  </li>
                )}
              </For>
            </Show>
          </ul>
        </Show>
      </nav>
    </>
  );
}
