export default function sitemap() {
  return [
    {
      url: 'https://startupweekendanapolis.com.br',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://startupweekendanapolis.com.br/startup-weekend',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://startupweekendanapolis.com.br/startup-weekend/patrocinadores',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]
}
