import pandas as pd
import numpy as np

class PricingEngine:
    def __init__(self, catalog_path: str = None):
        # In a real app, this would load from the database
        self.catalog = pd.DataFrame([
            {'provider': 'Azure', 'service': 'Compute', 'sku': 'D2s_v3', 'price': 0.096},
            {'provider': 'AWS', 'service': 'Compute', 'sku': 't3.medium', 'price': 0.0416},
            {'provider': 'GCP', 'service': 'Compute', 'sku': 'n1-standard-2', 'price': 0.095}
        ])

    def estimate_compute_monthly(self, provider: str, sku: str, hours: int = 730):
        """
        Calculates the monthly compute cost for a given provider and SKU.
        """
        row = self.catalog[(self.catalog['provider'] == provider) & (self.catalog['sku'] == sku)]
        if row.empty:
            return 0.0
        
        hourly_rate = row.iloc[0]['price']
        return hourly_rate * hours

    def apply_reservation_discount(self, base_cost: float, term_years: int = 1):
        """
        Applies a projected discount based on reservation term.
        """
        if term_years == 3:
            return base_cost * 0.40 # 60% discount
        elif term_years == 1:
            return base_cost * 0.60 # 40% discount
        return base_cost

if __name__ == "__main__":
    engine = PricingEngine()
    azure_cost = engine.estimate_compute_monthly('Azure', 'D2s_v3')
    discounted = engine.apply_reservation_discount(azure_cost, 3)
    
    print(f"Base Azure Monthly: ${azure_cost:.2f}")
    print(f"3-Year Reserved: ${discounted:.2f}")
