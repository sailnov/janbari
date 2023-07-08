<script setup>
    const props = defineProps({
        onLongPress: {
            type: Function,
            required: true,
        },
        delay: {
            type: Number,
            default: 500,
        },
    });
    const pressTimer = null;

    const startPress = () => {
        pressTimer = setTimeout(() => {
            props.onLongPress();
        }, props.delay);
    };

    const endPress = () => {
        if (!pressTimer) return;
        clearTimeout(pressTimer);
        pressTimer = null;
    };
</script>


<template>
    <div
        class="long-press-wrapper"
        @pointerdown="startPress"
        @pointerup="endPress"
        @pointermove="endPress"
        @pointercancel="endPress"
        @click="endPress"
        @contextmenu.prevent
    >
        <slot />
    </div>
</template>
<style scoped>
    .long-press-wrapper {
        user-select: none;
        pointer-events: none;

        /* stylelint-disable-next-line property-no-vendor-prefix */
        -webkit-user-select: none;
    }
</style>
