<template>
  <div>
    <h1>
      <a href="/"><i>arrow_back</i></a
      >｜ping
    </h1>
    <img
      src="https://media.discordapp.net/attachments/1081176997373431839/1081177064918491156/image.png"
    />
    <h5>BotのPing値を測ります。</h5>
    <h5>コマンド</h5>

    <div class="field label border">
      <input
        type="text"
        style="width: 50%"
        value="/ping"
        id="ping"
        onchange="document.getElementById('ping').value = '/ping'"
      />
      <span class="helper">コピーできます。</span>
      <button
        class="material-symbols-outlined"
        onclick="navigator.clipboard.writeText(document.getElementById('ping').value)"
      >
        content_copy
      </button>
    </div>
    <br />
    <br />
    <br />
    <br />
  </div>
</template>
