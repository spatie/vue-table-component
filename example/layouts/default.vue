<template>
    <!--
        SSR is causing some Webpack caching issues when watching the assets in
        dev mode, so it's disabled for now.
    -->
    <no-ssr>
        <nuxt></nuxt>
    </no-ssr>
</template>
