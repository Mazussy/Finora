import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, Plus, ArrowRight, TrendingUp, Shield, BarChart3, PieChart } from "lucide-react";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #222831 0%, #393E46 100%)' }}>
      <div className="container mx-auto max-w-6xl p-6 space-y-8">
        {/* Hero Section */}
        <div className="text-center py-12">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 rounded-2xl" style={{ background: 'linear-gradient(135deg, #00ADB5 0%, #00d4dd 100%)' }}>
              <Wallet className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-6xl font-bold mb-6" style={{ 
            background: 'linear-gradient(135deg, #00ADB5 0%, #00d4dd 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Finora
          </h1>
          <p className="text-2xl mb-4 max-w-3xl mx-auto" style={{ color: '#EEEEEE' }}>
            Take control of your finances with our intuitive expense tracking platform
          </p>
          <p className="text-lg mb-12 max-w-2xl mx-auto opacity-80" style={{ color: '#EEEEEE' }}>
            Monitor your spending, track your income, and achieve your financial goals with ease.
          </p>
          <div className="flex gap-6 justify-center">
            <Link to="/login">
              <Button 
                size="lg" 
                className="text-white font-semibold px-8 py-4 text-lg"
                style={{ background: 'linear-gradient(135deg, #00ADB5 0%, #00d4dd 100%)' }}
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button 
                variant="outline" 
                size="lg" 
                className="font-medium px-8 py-4 text-lg"
                style={{ 
                  borderColor: '#00ADB5', 
                  color: '#00ADB5',
                  backgroundColor: 'transparent'
                }}
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-12">
          <Card style={{ backgroundColor: '#393E46', borderColor: '#393E46' }} className="text-center p-6">
            <CardContent className="pt-6">
              <div className="p-3 rounded-xl mx-auto mb-4 w-fit" style={{ background: 'linear-gradient(135deg, #00ADB5 0%, #00d4dd 100%)' }}>
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#EEEEEE' }}>
                Track Income
              </h3>
              <p className="text-sm opacity-80" style={{ color: '#EEEEEE' }}>
                Monitor all your income sources and watch your money grow
              </p>
            </CardContent>
          </Card>

          <Card style={{ backgroundColor: '#393E46', borderColor: '#393E46' }} className="text-center p-6">
            <CardContent className="pt-6">
              <div className="p-3 rounded-xl mx-auto mb-4 w-fit" style={{ background: 'linear-gradient(135deg, #00ADB5 0%, #00d4dd 100%)' }}>
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#EEEEEE' }}>
                Expense Management
              </h3>
              <p className="text-sm opacity-80" style={{ color: '#EEEEEE' }}>
                Keep track of your spending and identify areas to save
              </p>
            </CardContent>
          </Card>

          <Card style={{ backgroundColor: '#393E46', borderColor: '#393E46' }} className="text-center p-6">
            <CardContent className="pt-6">
              <div className="p-3 rounded-xl mx-auto mb-4 w-fit" style={{ background: 'linear-gradient(135deg, #00ADB5 0%, #00d4dd 100%)' }}>
                <PieChart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#EEEEEE' }}>
                Visual Analytics
              </h3>
              <p className="text-sm opacity-80" style={{ color: '#EEEEEE' }}>
                Beautiful charts and graphs to visualize your financial data
              </p>
            </CardContent>
          </Card>

          <Card style={{ backgroundColor: '#393E46', borderColor: '#393E46' }} className="text-center p-6">
            <CardContent className="pt-6">
              <div className="p-3 rounded-xl mx-auto mb-4 w-fit" style={{ background: 'linear-gradient(135deg, #00ADB5 0%, #00d4dd 100%)' }}>
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#EEEEEE' }}>
                Secure & Private
              </h3>
              <p className="text-sm opacity-80" style={{ color: '#EEEEEE' }}>
                Your financial data is stored securely and kept private
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card style={{ backgroundColor: '#393E46', borderColor: '#393E46' }} className="text-center py-12">
          <CardContent>
            <div className="p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: '#222831' }}>
              <Plus className="h-10 w-10" style={{ color: '#00ADB5' }} />
            </div>
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#EEEEEE' }}>
              Ready to start your financial journey?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-80" style={{ color: '#EEEEEE' }}>
              Join thousands of users who have taken control of their finances with Finora. 
              Start tracking your transactions today!
            </p>
            <Link to="/login">
              <Button 
                size="lg" 
                className="text-white font-semibold px-12 py-4 text-lg"
                style={{ background: 'linear-gradient(135deg, #00ADB5 0%, #00d4dd 100%)' }}
              >
                Start Tracking Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
