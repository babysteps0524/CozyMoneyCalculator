const site = 'https://cozymoney.kr';

const paths = [
  '/',
  '/about/',
  '/calculators/',
  '/calculators/acquisition/',
  '/calculators/brokerage/',
  '/calculators/capitalGain/',
  '/calculators/carTax/',
  '/calculators/compound/',
  '/calculators/dsr/',
  '/calculators/dti/',
  '/calculators/hourly-wage/',
  '/calculators/incomeTax/',
  '/calculators/leaseLoan/',
  '/calculators/legal-scrivener/',
  '/calculators/loan/',
  '/calculators/monthly-salary/',
  '/calculators/percentage/',
  '/calculators/property/',
  '/calculators/rent/',
  '/calculators/salary/',
  '/calculators/savings/',
  '/calculators/severance/',
  '/calculators/unemployment/',
  '/calculators/vacation/',
  '/calculators/vat/',
  '/calculators/weekly/',
  '/contact/',
  '/privacy/',
  '/terms/',
  '/tools/',
  '/tools/age/',
  '/tools/date/',
  '/tools/dday/',
  '/tools/lotto/',
  '/tools/password/',
  '/tools/percent/',
  '/tools/picker/',
  '/tools/random/',
  '/tools/unit/',
] as const;

export const prerender = true;

export function GET() {
  const urls = paths
    .map(
      (path) =>
        `  <url><loc>${site}${path}</loc></url>`,
    )
    .join('\n');

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    '</urlset>',
    '',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
