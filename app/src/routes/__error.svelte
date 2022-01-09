<script context="module" lang="ts">
	import { dev } from '$app/env'
	import type { ErrorLoad } from '@sveltejs/kit'

	export const load: ErrorLoad = ({ error, status }) => ({
		props: { error, status },
	})
</script>

<script lang="ts">
	export let status: number
	export let error: { message: string; frame: string; stack: string }

	const offline = typeof navigator !== 'undefined' && navigator.onLine === false

	const title = offline ? 'Offline' : status
	const message = offline ? 'Find the internet and try again' : error.message
</script>

<svelte:head>
	<title>{title} - Tweeta</title>
</svelte:head>

<header>
	<p><a href="/">🐦 Tweeta</a></p>
</header>

<section>
	<h1>{title}</h1>

	<pre>{message}</pre>

	{#if dev && error.frame}
		<pre>{error.frame}</pre>
	{/if}
	{#if dev && error.stack}
		<pre>{error.stack}</pre>
	{/if}
</section>

<style>
	section {
		margin: 1rem;
	}

	header {
		font-size: 50px;
		font-weight: bold;
		text-align: center;
	}

	header a {
		text-decoration: none;
		color: #dadfdd;
	}

	h1 {
		font-size: 2.8em;
		font-weight: 700;
		margin-bottom: 0.25em;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>
