<script>
    import { getImageURL } from '$lib/utils';
    export let avatar;
    export let collectionId;
    export let userId;
    export let type;
    export let writer;
    export let sent;
    export let message;
    export let status;
</script>


<div>
    <div class="chat chat-{type}">
        <div class="chat-image avatar">
            <div class="w-10 rounded-full">
                <img
                        src={avatar ? getImageURL(collectionId, userId, avatar) : `https://ui-avatars.com/api/?name=${writer}`}
                        alt="User avatar"
                />
            </div>
        </div>
        <div class="chat-header">
            {writer}
            <time class="text-xs opacity-50">{sent}</time>
        </div>
        <div class="chat-bubble">{message}</div>
        <div class="chat-footer opacity-50">
            {status}
        </div>
    </div>
</div>