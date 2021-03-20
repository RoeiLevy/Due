<template>
    <div class="activity-log">
        <activity-preview />

    </div>
</template>

<script>

import activityPreview from './activity-preview'
import ActivityPreview from './activity-preview.vue'
export default {
props: ['board'],
components: {
    activityPreview
}
}
</script>

