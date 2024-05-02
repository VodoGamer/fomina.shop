import { Component, Show, createSignal } from "solid-js";
import { Portal } from "solid-js/web";

import MenuNav from "./MenuNav";

import styles from "./assets/header.module.sass";
import menu_icon from "./assets/menu.svg";
import menu_cross from "./assets/menu_cross.svg";
import cart_icon from "./assets/cart.svg";
import { Transition } from "solid-transition-group";

import "../../assets/animations.sass";

const Menu: Component = () => {
  const [showMenu, setShowMenu] = createSignal(false);

  function toggleMenu() {
    setShowMenu(!showMenu());
  }

  return (
    <>
      <Portal>
        <Transition name="slide-fade">
          <Show when={showMenu()}>
            <div class={styles.menu__block}>
              <div class={styles.menu} style={{ "align-items": "start" }}>
                <MenuNav toggleMenu={toggleMenu} />
                <button class={styles.menu_button} onClick={toggleMenu}>
                  <img class={styles.header__image} src={menu_cross} alt="" />
                </button>
              </div>
            </div>
          </Show>
        </Transition>
      </Portal>
      <a class={styles.menu_button} href="/cart">
        <img class={styles.header__image} src={cart_icon} alt="" />
      </a>
      <button class={styles.menu_button} onClick={toggleMenu}>
        <img class={styles.header__image} src={menu_icon} alt="" />
      </button>
    </>
  );
};

export default Menu;
