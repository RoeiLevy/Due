<template>
    <div class="update-preview">
        <div class="update-header">
            <div class="username">
                <h5>By {{ comment.byMember.fullname }}</h5>
            </div>
        </div>
        <div v-html="comment.txt" class="update-txt-wrapper"></div>
    </div>
</template>

<script>
export default {
    props: ['comment'],
}
</script>

