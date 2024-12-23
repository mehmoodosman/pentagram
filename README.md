# Pentagram: Instagram, but with AI Images

## Overview

Pentagram is a web app where users can generate images using text, through an image generation model hosted on serverless GPUs and ensured low latency for a smooth user experience.

## Requirements

- Host an image generation model (e.g., Stable Diffusion) on serverless GPUs through Modal, ensuring low-latency performance for smooth user experience.
- Create a web app that allows users to generate images from text prompts, manage their creations, and interact socially through likes, comments, and sharing features.
- Incorporate intuitive UI/UX design, authentication, and efficient image management with prompt histories.

## Challenges

- Ensuring the hosted image generation model operates within low-latency thresholds (<2 seconds) while handling multiple concurrent requests
- Managing the dynamic scaling of GPU resources to handle demand spikes without exceeding cost or causing performance bottlenecks.
- Add the ability to search for images semantically
- Prevent harmful or inappropriate content from being generated
- Build a recommendation system that creates personalized feeds for users, balancing new content discovery with user preferences

## Resources

- [Getting Started with Modal](https://modal.com/docs/examples/hello_world)
- [Building an Image Generation Pipeline on Modal](https://www.youtube.com/watch?v=sHSKArbiKmU)
- [Run Stable Diffusion as CLI, API, and Web UI](https://modal.com/docs/examples/text_to_image)
- [Midjourney Examples](https://www.midjourney.com/explore?tab=top)
- [NVIDIA GPU Comparison](https://www.digitalocean.com/community/tutorials/h100_vs_other_gpus_choosing_the_right_gpu_for_your_machine_learning_workload)
- [Modal Playground](https://modal.com/playground/get_started)
- [Modal Cold Start Guide](https://modal.com/docs/guide/cold-start)
- [Image Generation Models](https://huggingface.co/models?pipeline_tag=text-to-image)
- [Modal Web Endpoints](https://modal.com/docs/guide/webhooks)
