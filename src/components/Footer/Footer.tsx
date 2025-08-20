import React from "react";

const Footer: React.FC = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-rich-blue-900 text-cream-50 pb-16">
			<div className="max-w-7xl mx-auto px-8 py-16">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-12">
					<div className="col-span-1 md:col-span-2">
						<a href="/" className="block mb-6">
							<img
								src="/images/logolight.png"
								alt="Delta Edge Capital"
								className="h-10 w-auto"
							/>
						</a>
						<p className="text-cream-100/80 max-w-md leading-relaxed">
							Delta Edge Capital is a holdings company focused on acquiring, 
							developing, and scaling innovative digital SaaS products that 
							drive transformation across industries.
						</p>
					</div>

					<div>
						<h3 className="text-cream-50 font-semibold mb-4">Company</h3>
						<ul className="space-y-3">
							<li>
								<a
									href="mailto:info@deltaedgecapital.co.uk"
									className="text-cream-100/80 hover:text-cream-50 transition-colors duration-200"
								>
									Contact Us
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="text-cream-50 font-semibold mb-4">Contact</h3>
						<ul className="space-y-3 text-cream-100/80">
							<li>
								<a href="mailto:info@deltaedegecapital.co.uk">
									info@deltaedgecapital.co.uk
								</a>
							</li>
							{/* <li>+447554429741</li> */}
							<li>
								85 Great Portland Street
								<br />
								London
								<br />
								England W1W 7LT
							</li>
						</ul>
					</div>
				</div>

				<div className="mt-12 pt-8 border-t border-rich-blue-800">
					<div className="flex flex-col md:flex-row justify-center items-center gap-4">
						<p className="text-cream-100/60 text-sm">
							© {currentYear} Delta Edge Capital. All rights reserved.
						</p>
						{/* <div className="flex space-x-6">
              <a href="#" className="text-cream-100/60 hover:text-cream-50 transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-cream-100/60 hover:text-cream-50 transition-colors duration-200">
                Terms of Service
              </a>
            </div> */}
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
